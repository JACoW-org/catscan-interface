import React from "react";
import {Pages} from "../App";
import WordUpload from "./WordUpload";
import Report, {WordReport} from "./Report";

type WordProps = {
    changePage: (page: Pages) => void,
    report: WordReport | null,
    setReport: (report: WordReport) => void
}

const Word: React.FC<WordProps> = (props) => {
    if (props.report !== null) {
        return <Report report={props.report} />
    }
    return <WordUpload setReport={props.setReport} />
}

export default Word;