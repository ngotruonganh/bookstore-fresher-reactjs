import {PacmanLoader} from "react-spinners";
const Loading = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <PacmanLoader color='#f53d2d'/>
        </div>
    );
};

export default Loading;
