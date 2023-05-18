import { useState } from "react";
import "./App.css";
import JDatePicker from "./component";

function App() {
    const [date, setDate] = useState<Date>(new Date("2012-02-02"));

    const changeDate = (newDate: Date) => {
        setDate(newDate);
    };

    return (
        <div className="App">
            <JDatePicker placeholder="انتخاب تاریخ" value={date} onChange={changeDate}/>
        </div>
    );
}

export default App;
