import {
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from "react";
import DayOfWeek from "./DayOfWeek";
import "./_days.css";

interface IDaysComponent {
    daysCount?: any;
}
interface IDayState {
    selectedDay: string;
    daysCount: any;
}

const Days: FC<PropsWithChildren<any>> = (props): JSX.Element => {
    const [dayState, setDayState]: [
        IDayState,
        Dispatch<SetStateAction<IDayState>>
    ] = useState<IDayState>({
        selectedDay: "",
        daysCount: props.daysCount,
        // selectedYear: this.props.selectedYear,
    });

    const { selectedDay, daysCount } = dayState;
    const DaysOfWeekComponent: () => JSX.Element = () =>
        useMemo(() => <DayOfWeek />, []);

    const renderDays = () => {
        const { firstDay, currentMonth, selectedDay } = props;
        const {
            daysCount,
            //   disableFromYear,
            //   disableFromMonth,
            //   disableFromDay,
            //   selectedYear
        } = dayState;
        // let year = selectedYear.toString();
        let month = currentMonth.toString();

        // if (month.length == 1) month = "0" + month;

        // let enable = true;
        // let check = false;

        // if (disableFromYear > year) enable = false;
        // else if (disableFromYear == year && disableFromMonth > month)
        //   enable = false;
        // else if (disableFromYear == year && disableFromMonth == month) check = true;
        // let result = [];

        // for (let i = 1; daysCount >= i; i++) {
        //   let addedClass = "";
        //   let marginRight = "0%";
        //   let date;
        //   let number = i.toString().replace(/1|2|3|4|5|6|7|8|9|0/gi, function(e) {
        //     return mapObj[e];
        //   });

        //   if (i == 1) marginRight = firstDay * 14.28 + "%";

        //   if (i < 10) date = year + month + "0" + i.toString();
        //   else date = year + month + i.toString();

        //   if (date == selectedDay) addedClass = " selected";

        //   const today = moment().format("jYYYYjMMjDD");

        //   if (date == today) addedClass += " current-date";

        //   if (check) {
        //     if (i < disableFromDay) enable = false;
        //     else enable = true;
        //   }

        //   result.push(
        //     <div
        //       className={"day-items" + addedClass}
        //       key={i}
        //       id={date}
        //       style={enable ? { marginRight: marginRight } : {
        //         background: "#ccc",
        //         cursor: "default",
        //         marginRight: marginRight
        //       }}
        //       onClick={() => enable ? this.dayClicked(1, date) : {}}
        //     >
        //       {number}
        //     </div>
        //   );
        // }

        // return result;
        return <div>ssss</div>;
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

    return (
        <div>
            {DaysOfWeekComponent()}
            <div className="JC-days">
                <div className="holder">{!!daysCount && renderDays()}</div>
            </div>
        </div>
    );
};

export default Days;
