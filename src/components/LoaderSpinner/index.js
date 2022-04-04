import {Oval} from "react-loader-spinner";

const LoaderSpinner = ({span}) => (
    <div className={`grid md:col-span-${span} justify-items-center`}>
        <Oval
            ariaLabel="loading-indicator"
            height={70}
            width={70}
            strokeWidth={3}
            color="#282850"
            secondaryColor="#dc7828"
        />
    </div>
);

export default LoaderSpinner;
