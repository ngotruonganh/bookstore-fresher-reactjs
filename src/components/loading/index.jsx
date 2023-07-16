import {PacmanLoader} from "react-spinners";
const Loading = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <div>
                <PacmanLoader color='#f53d2d'/>
                Back end starting , please wait!
            </div>
        </div>
    );
};

export default Loading;
