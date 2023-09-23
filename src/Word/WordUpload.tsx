import React from 'react';
import {Accept, useDropzone} from 'react-dropzone'
import axios from 'axios';
import './WordUpload.css';

type Conference = {
    id: number,
    code: string,
}
type Upload = "idle" | "uploading" | "processing" | "success" | "error";

const baseUrl = "https://catscan-checker-fe4ty.ondigitalocean.app/catscan";
const onlyDocx: Accept = {"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]};
const storage = "https://catstore.syd1.digitaloceanspaces.com/";

type WordUploadProps = {
    setReport: (report: any) => void
}

const WordUpload: React.FC<WordUploadProps> = (props) => {
    const [conferences, setConferences] =
        React.useState([] as Conference[]);
    const [selectedConference, setSelectedConference] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const [upload, setUpload] = React.useState('idle' as Upload);
    const [error, setError] = React.useState('' as string);
    const opts = {
        noDrag: true,
        accept: onlyDocx,
        multiple: false,
    };

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

    const uploadPaper = () => {
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
        try {
            setUpload("uploading");
            await uploadPaper()
            setUpload("processing");
            const response = await processPaper()
            if (response.data.error !== undefined) {
                setUpload("error");
                setError(response.data.error)
            } else {
                setUpload("success");
                props.setReport(response.data);
                console.log(response.data);
            }
        } catch (e: any) {
            setError(`An unknown error occurred: ${e}`);
            setUpload("error");
        }
    };

    return <div className={"row"}>
        <div className={"col-lg-8"}>
            {upload === 'idle' &&
                <form onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                }}>

                    <h2>Word Validator</h2>
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
                            <label>Upload a Word file</label>
                        </div>
                        <section>
                            <div {...getRootProps()} className={"dropzone"}>
                                <input {...getInputProps()} />

                                {acceptedFiles.length > 0 &&
                                    <div>
                                        <div className={"pb-2"}>
                                            <i className="fas fa-4x fa-file-word"></i>

                                        </div>
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
                                        <div className={"small"}>File must be PAPERID.docx</div>
                                    </div>
                                }
                            </div>
                        </section>
                    </div>
                    <div>
                        <button type={"submit"} onClick={submitForm}
                                className={`btn btn-block btn-lg btn-primary ${acceptedFiles.length === 0 ? 'disabled' : ''}`}
                                disabled={acceptedFiles.length === 0}>
                            Scan Paper <i className={"fas fa-chevron-right"}></i>
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

export default WordUpload;
