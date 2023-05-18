import React, {
    useEffect,
    useState,
    useCallback,
    useMemo,
    PropsWithChildren,
    FC,
    Dispatch,
    SetStateAction,
} from "react";
import "./_months.css";

const persianMonths: string[] = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
];

interface IRenderMonths {
    selectedMonth: number;
    monthClicked: (index: number) => void;
}

interface IMonthsComponent {
    month?: number;
    clickEvent: (month: number) => void;
    monthTitleEnable?: string;
}

interface IMonthState {
    months: string[];
    monthPickerView: boolean;
    selectedMonth: number;
}

const Months: FC<PropsWithChildren<IMonthsComponent>> = ({
    month,
    clickEvent,
    monthTitleEnable,
}): JSX.Element => {
    const [monthState, setMonthState]: [
        IMonthState,
        Dispatch<SetStateAction<IMonthState>>
    ] = useState<IMonthState>({
        months: persianMonths,
        monthPickerView: false,
        selectedMonth: 1,
    });

    let { months, selectedMonth, monthPickerView }: IMonthState = monthState;

    useEffect(() => {
        console.log(typeof month)
        if (!!month)
            setMonthState((prevState: IMonthState) => ({
                ...prevState,
                selectedMonth: month,
            }));
    }, [month]);

    const openMonthsDatePicker: () => void = useCallback(() => {
        setMonthState((prevState: IMonthState) => ({
            ...prevState,
            monthPickerView: !monthPickerView,
        }));
    }, [monthPickerView]);

    const monthClicked: (i: number) => void = useCallback(
        (i: number) => {
            clickEvent?.(i);
            setMonthState((prevState: IMonthState) => ({
                ...prevState,
                monthPickerView: false,
                selectedMonth: i,
            }));
        },
        [clickEvent]
    );

    const renderMonths: JSX.Element = useMemo(
        () => (
            <div className="monthPicker">
                <RenderMonths
                    selectedMonth={selectedMonth}
                    monthClicked={monthClicked}
                />
            </div>
        ),
        [selectedMonth,monthClicked]
    );

    return (
        <div className="JC-months">
            {monthTitleEnable && <span>ماه:{monthTitleEnable} </span>}
            <div className="holder">
                <div
                    onClick={() => monthClicked(selectedMonth - 1)}
                    className="prev"
                >
                    {"<"}
                </div>
                <div onClick={openMonthsDatePicker} className="print-month">
                    {months[selectedMonth - 1]}
                </div>
                <div
                    onClick={() => monthClicked(selectedMonth + 1)}
                    className="next"
                >
                    {">"}
                </div>
                {monthPickerView && renderMonths}
            </div>
        </div>
    );
};

const RenderMonths: FC<PropsWithChildren<IRenderMonths>> = ({
    selectedMonth,
    monthClicked,
}): JSX.Element => {
    return (
        <>
            {persianMonths?.map((month, index) => (
                <div
                    key={month}
                    onClick={() => monthClicked(index + 1)}
                    className={`month-items ${
                        persianMonths[selectedMonth - 1] === month
                            ? "selected"
                            : ""
                    }`}
                >
                    {month}
                </div>
            ))}
        </>
    );
};

export default Months;
