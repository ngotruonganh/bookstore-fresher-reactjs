import {PacmanLoader} from "react-spinners";

const Loading = () => {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
            <PacmanLoader color="#36d7b7"/>
        </div>
    );
};

export default Loading;
