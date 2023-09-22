import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Accept, useDropzone} from 'react-dropzone'
import axios from 'axios';

type Conference = {
    id: number,
    code: string,
}

type Results = {
    filename: string
}

const baseUrl = "https://catscan-checker-fe4ty.ondigitalocean.app/catscan";
const onlyDocx: Accept = {"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]};
const storage = "https://catstore.syd1.digitaloceanspaces.com/";
type Upload = "idle" | "uploading" | "processing" | "success" | "error";

function App() {
    const [conferences, setConferences] =
        React.useState([] as Conference[]);
    const [selectedConference, setSelectedConference] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const [upload, setUpload] = React.useState('idle' as Upload);
    const [error, setError] = React.useState('' as string);
    const [results, setResults] = React.useState({} as Results);
    const opts = {
        noDrag: true,
        accept: onlyDocx,
        multiple: false,
    };

    const restart = () => {
        setProgress(0);
        setUpload('idle');
        setError('');
        setResults({} as Results);
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
                setResults(response.data)
            }
        } catch (e: any) {
            setError(`An unknown error occurred: ${e}`);
            setUpload("error");
        }
    };

    return (
        <div>
            <div className="header">
                <div className="container">
                    <a href="https://www.jacow.org/" target="_blank">
                        <img alt="JaCoW Logo" className="float-md-right" height="50"
                             src="https://www.jacow.org/pub/images/header.png"/>
                    </a>
                    <a href="/"><h1>Cat Scan</h1></a>
                </div>
            </div>
            <div className="nav-area">
                <div className="container">
                    <div className="navbar navbar-expand-lg">
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarContent"
                                aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Word</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link" href="#">LaTeX</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className={"row"}>
                    <div className={"col-8"}>
                        <h2>Word Validator</h2>
                        {upload === 'idle' &&
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                submitForm();
                            }}>
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
                                            className={`btn btn-primary ${acceptedFiles.length === 0 ? 'disabled' : ''}`}
                                            disabled={acceptedFiles.length === 0}>
                                        Scan Paper <i className={"fas fa-chevron-right"}></i>
                                    </button>
                                </div>
                            </form>
                        }

                        {(upload === "uploading" || upload === "processing") &&
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated"
                                     style={{width: (progress + "%")}}>
                                </div>
                            </div>
                        }

                        {upload === "processing" &&
                            <div>
                                <div>
                                    Processing file <i className="fas fa-circle-notch fa-spin"></i>
                                </div>
                            </div>
                        }

                        {upload === "error" &&
                            <div>
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

                                <button className={"btn btn-primary"} onClick={(e) => restart()}>
                                    <i className="fas fa-chevron-left"></i> Try Again
                                </button>
                            </div>
                        }
                    </div>
                    <div className={"col-4"}>
                        <img src={"cat.png"} alt="cat"/>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;
