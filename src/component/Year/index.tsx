import {
    FC,
    memo,
    MutableRefObject,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from "react";

interface IYearComponent {
    year: number;
    changeEvent?: (year: number) => void;
}

interface IYearState {
    year: number;
    error?:string;
}

const mapObj = {
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
    0: "۰",
};

const Years: FC<PropsWithChildren<IYearComponent>> = ({year,changeEvent}):JSX.Element => {
    const [yearState, setYearState] = useState<IYearState>({
        year: 0,
        error: "",
    });

    const yearRef:MutableRefObject<any> = useRef<any>(null);

    useEffect(() => {
        setYearState((prevState) => ({
            ...prevState,
            year: year,
        }));
    }, [year]);

    const yearChanged = () => {
        if (!yearRef.current.value) return;
        const { value } = yearRef.current;
        setYearState((prevState) => ({
            ...prevState,
            year: value,
        }));
        if (value.length === 4 && value > 1300 && value < 1500)
            changeEvent?.(parseInt(value));
        // else
        // setYear((prevState) => ({
        //     ...prevState,
        //     error: "سال ۴ رقم و درفاصله ۱۳۰۰ تا ۱۵۰۰ باشد",
        // }));
    };

    let yearString: string = yearState.year
        .toString()
        .replace(/1|2|3|4|5|6|7|8|9|0/gi, function (e: string) {
            return mapObj[e as keyof object];
        });

    return (
        <div className="number">
            <span>{yearString}</span>
            {/* <input
                type="tel"
                ref={yearRef}
                placeholder="سال"
                onChange={yearChanged}
                value={yearState.year}
            />
            {year.error && (
                <div className="JC-tooltip">
                    <p style={{ color: "red" }}>{year.error}</p>
                </div>
            )} */}
        </div>
    );
};

export default memo(Years);
