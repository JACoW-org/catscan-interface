import React from 'react';
import {Accept, useDropzone} from 'react-dropzone'
import axios from 'axios';
import './Upload.css';
import {Report} from "./App";
import mixpanel from 'mixpanel-browser';
import {useSearchParams} from "react-router-dom";

mixpanel.init('a246ec96c93c521c41ab10056a8555bb');

type Conference = {
    id: number,
    code: string,
}

type Upload = "idle" | "uploading" | "processing" | "success" | "error";
const baseUrl = "https://scan-api.jacow.org/catscan";
const onlyDocx: Accept = {
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    "application/x-tex": [".tex"]
};
const storage = "https://catstore.syd1.digitaloceanspaces.com/";
type UploadProps = {
    setReport: (report: Report) => void
}

const Upload: React.FC<UploadProps> = (props) => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [conferences, setConferences] =
        React.useState([] as Conference[]);
    const [selectedConference, setSelectedConference] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const [upload, setUpload] = React.useState('idle' as Upload);
    const [error, setError] = React.useState('' as string);
    const opts = {
        accept: onlyDocx,
        multiple: false,
    };

    React.useEffect(() => {
        if (searchParams.get("results")) {
            setUpload("processing");
            axios({
                url: baseUrl + "/word",
                method: 'POST',
                data: {
                    results: searchParams.get("results")
                },
                headers: {
                    'Content-Type': "application/json"
                }
            }).then((response) => {
                if (response.data.error !== undefined) {
                    setUpload("error");
                    setError(response.data.error)
                    mixpanel.track('Retrieval Failure', {
                        'distinct_id': searchParams.get("results"),
                        'error': response.data.error
                    });
                } else {
                    setUpload("success");
                    props.setReport({type: "word", report: response.data});
                    mixpanel.track('Retrieval Success', {
                        'distinct_id': searchParams.get("results"),
                        ...response.data.scores
                    });
                }
            }).catch(() => {
                setUpload("error")
                setError("Unable to retrieve results")
            });
        }
    }, [searchParams]);

    const restart = () => {
        setProgress(0);
        setUpload('idle');
        setError('');
    }

    const {getRootProps, getInputProps, acceptedFiles} = useDropzone(opts);

    React.useEffect(() => {
        const getConferences = async () => {
            const result = await fetch(baseUrl + "/conferences");
            return await result.json();
        }
        getConferences().then((conferences) => {
            setConferences(conferences);
        });
    }, []);

    const uploadWord = () => {
        const formData = new FormData();
        // eslint-disable-next-line no-template-curly-in-string
        formData.append("key", "${filename}");
        formData.append("file", acceptedFiles[0]);
        return axios({
            onUploadProgress: (progressEvent) => {
                if (progressEvent.progress !== undefined) {
                    setProgress(Math.round(progressEvent.progress * 100));
                }
            },
            url: storage,
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': "multipart/form-data"
            }
        });
    }


    const uploadLaTeX = async (content: string) => {
        return axios({
            onUploadProgress: (progressEvent) => {
                if (progressEvent.progress !== undefined) {
                    setProgress(Math.round(progressEvent.progress * 100));
                }
            },
            url: baseUrl + "/latex",
            method: 'POST',
            data: {
                filename: acceptedFiles[0].name,
                content: content
            },
            headers: {
                'Content-Type': "application/json"
            }
        });
    }

    const processPaper = () => {
        return axios({
            url: baseUrl + "/word",
            method: 'POST',
            data: {
                conference: selectedConference,
                name: acceptedFiles[0].name,
            },
            headers: {
                'Content-Type': "application/json"
            }
        });
    }
    const submitForm = async () => {
        let processingStage = "";
        try {
            if (acceptedFiles.length > 0) {
                setUpload("uploading");
                if (acceptedFiles[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                    processingStage = "word-uploading";
                    await uploadWord()
                    processingStage = "word-processing";
                    setUpload("processing");
                    const response = await processPaper();
                    processingStage = "word-parsing";
                    if (response.data.error !== undefined) {
                        setUpload("error");
                        setError(response.data.error)
                        mixpanel.track('Upload Failure', {
                            'distinct_id': acceptedFiles[0].name,
                            'error': response.data.error
                        });
                    } else {
                        setUpload("success");
                        props.setReport({type: "word", report: response.data});
                        mixpanel.track('Upload Success', {
                            'distinct_id': acceptedFiles[0].name,
                            ...response.data.scores
                        });
                    }
                } else {
                    const content = await acceptedFiles[0].text()
                    processingStage = "latex-uploading";
                    const response = await uploadLaTeX(content)
                    processingStage = "latex-processing";
                    if (response.data.error !== undefined) {
                        setUpload("error");
                        setError(response.data.error)
                        mixpanel.track('Upload Failure', {
                            'distinct_id': acceptedFiles[0].name,
                            'issues': response.data.error
                        });
                    } else {
                        setUpload("success");
                        props.setReport({type: "latex", report: response.data});
                        mixpanel.track('Upload Success', {
                            'distinct_id': acceptedFiles[0].name,
                            'issues': response.data.issues?.length ?? 0
                        });
                    }
                }
            }
        } catch (e: any) {
            setError(`An unknown error occurred: ${e}`);
            setUpload("error");
            mixpanel.track('Upload Failure', {
                'stage': processingStage,
                'conference': selectedConference,
                'distinct_id': acceptedFiles[0].name,
                'size': acceptedFiles[0].size,
                'error': `An unknown error occurred: ${e}`
            });
        }
    };

    return <div className={"row"}>
        <div className={"col-lg-8"}>
            {upload === 'idle' &&
                <form onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                }}>

                    <h2>Word and LaTeX Validator</h2>
                    <div className={"form-group"}>
                        <label>Select a conference: (optional)</label>
                        <div>
                            <div className={"inline-block"}>
                                <select className={"form-control"}
                                        value={selectedConference}
                                        onChange={(e) => {
                                            setSelectedConference(parseInt(e.target.value));
                                        }}>
                                    <option value={0}>No conference selected</option>
                                    {conferences.map((conf) =>
                                        <option key={conf.id} value={conf.id}>
                                            {conf.code}
                                        </option>
                                    )};
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <div>
                            <label>Upload a Word or LaTeX file</label>
                        </div>
                        <section>
                            <div {...getRootProps()} className={"dropzone"}>
                                <input {...getInputProps()} />

                                {acceptedFiles.length > 0 &&
                                    <div>
                                        {acceptedFiles[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ?
                                            <div className={"pb-2"}>
                                                <i className="fas fa-4x fa-file-word"></i>
                                            </div> :
                                            <div className={"pb-2"}>
                                                <i className="fas fa-4x fa-file-code"></i>
                                            </div>}
                                        <div>{acceptedFiles[0].name}</div>
                                        <div className={"small"}>
                                            {(acceptedFiles[0].size / 1024 / 1024).toFixed(2)} mb
                                        </div>
                                    </div>
                                }
                                {acceptedFiles.length === 0 &&
                                    <div>
                                        <div className={"pb-2"}>
                                            <i className="fas fa-4x fa-upload"></i>
                                        </div>
                                        <div>Drop a file here, or click to select a file</div>
                                        <div className={"small"}>File must be PAPERID.docx or PAPERID.tex</div>
                                    </div>
                                }
                            </div>
                        </section>
                    </div>
                    <div>
                        <button type={"submit"} onClick={submitForm}
                                className={`btn btn-block btn-lg btn-primary ${acceptedFiles.length === 0 ? 'disabled' : ''}`}
                                disabled={acceptedFiles.length === 0}>
                            Scan Paper
                        </button>
                    </div>
                </form>}

            {(upload === "uploading" || upload === "processing") && <>
                <h2>Uploading document...</h2>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated"
                         style={{width: (progress + "%")}}>
                    </div>
                </div>
                {upload === "processing" &&
                    <p className={"py-2"}>
                        Processing file <i className="fas fa-circle-notch fa-spin"></i>
                    </p>
                }
            </>}

            {upload === "error" &&
                <div>
                    <h2>Failed to process</h2>
                    <div className={"alert alert-danger error-panel"}>
                        <div><i className="fas fa-exclamation-circle fa-2x"></i></div>

                        <div>{error.split('\n').map(function (item, key) {
                            return (
                                <div key={key}>
                                    {item}
                                </div>
                            )
                        })}</div>
                    </div>

                    <button className={"btn btn-primary"} onClick={(_) => restart()}>
                        <i className="fas fa-chevron-left"></i> Try Again
                    </button>
                </div>}
        </div>
        <div className={"col-4 p-4 hidden-md cat-col"}>
            <img src={"cat.png"} alt="cat"/>
        </div>
    </div>
}

export default Upload;
