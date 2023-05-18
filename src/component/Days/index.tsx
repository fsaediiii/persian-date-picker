import {
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import moment from "moment-jalaali";

import "./_days.css";

interface IDaysComponent {
    daysCount?: number;
    firstDay?: any;
    clickEvent?: (day: string) => void;
    selectedDay?: string;
}

interface IDayState {
    selectedDay?: string;
    daysCount?: number;
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

const Days: FC<PropsWithChildren<IDaysComponent>> = (props) => {
    const [dayState, setDayState]: [
        IDayState,
        Dispatch<SetStateAction<IDayState>>
    ] = useState<IDayState>({
        selectedDay: "",
        daysCount: 0,
    });
    const { daysCount } = dayState;

    const dayClicked = (date: string) => {
        let { clickEvent } = props;
        if (clickEvent) clickEvent(date);
    };

    const renderDays = () => {
        const { firstDay, selectedDay } = props;
        const { daysCount } = dayState;

        let result = [];

        if (daysCount)
            for (let i = 1; daysCount >= i; i++) {
                let addedClass = "";
                let marginRight = "0%";
                let date = "";
                let number = i
                    .toString()
                    .replace(/1|2|3|4|5|6|7|8|9|0/gi, function (e) {
                        return mapObj[e as keyof object];
                    });

                if (i === 1) marginRight = firstDay * 14.28 + "%";
                if (i < 10) date = "0" + i.toString();
                else date = i.toString();

                if (date === selectedDay) addedClass = " selected";

                const today = moment().format("jYYYYjMMjDD");

                if (date === today) addedClass += " current-date";

                result.push(
                    <div
                        className={"day-items" + addedClass}
                        key={i}
                        id={date}
                        style={
                            i.toString() === selectedDay
                                ? {
                                      background: "#ccc",
                                      cursor: "default",
                                      marginRight: marginRight,
                                  }
                                : { marginRight: marginRight }
                        }
                        onClick={() => dayClicked(date)}
                    >
                        {number}
                    </div>
                );
            }

        return result;
    };

    useEffect(() => {
        // let unix = "";
        // if (!!props.disableFromUnix) unix = props.disableFromUnix;
        // if (!!unix) {
        //     dayState.disableFromYear = moment(unix * 1000).format("jYYYY");
        //     dayState.disableFromMonth = moment(unix * 1000).format("jMM");
        //     dayState.disableFromDay = moment(unix * 1000).format("jDD");
        // }
    }, []);

    useEffect(() => {
        setDayState((prevState) => ({
            ...prevState,
            daysCount: props.daysCount,
        }));
    }, [props.daysCount]);

    return (
        <div>
            <div className="JC-days">
                <div className="holder">{!!daysCount && renderDays()}</div>
                {/* {renderDay()} */}
            </div>
        </div>
    );
};

export default Days;
