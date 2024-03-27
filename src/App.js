import React, { useRef, useState, useEffect } from "react";
import ModalSettings from "./components/modalSettings";
import Navigation from "./components/navigation";
import Timer from "./components/timer";
import './App.css';
import './index.css';


export default function Home() {
	const [POMODORO, SHORTBREAK, LONGBREAK] = [25, 5, 10];

	const [openSetting, setOpenSetting] = useState(false);
	const [ticking, setTicking] = useState(false);
	const [isTimeUp, setIsTimeUp] = useState(false);

	const [poromodo, setPomodo] = useState(POMODORO);
	const [shortBreak, setShortBreak] = useState(SHORTBREAK);
	const [longBreak, setLongBreak] = useState(LONGBREAK);
	const [seconds, setSeconds] = useState(0);
	const [stage, setStage] = useState(0);
	const [consumedSecond, setConsumedSecond] = useState(0);

	const pomodoroRef = useRef();
	const shortBreakRef = useRef();
	const longBreakRef = useRef();

	const updateTimeDefaultValue = () => {
		setPomodo(pomodoroRef.current.value);
		setShortBreak(shortBreakRef.current.value);
		setLongBreak(longBreakRef.current.value);
	};

	const getTickingTime = () => {
		const timeStage = {
			0: poromodo,
			1: shortBreak,
			2: longBreak,
		};
		return timeStage[stage];
	};

	const updateMinute = () => {
		const updateStage = {
			0: setPomodo,
			1: setShortBreak,
			2: setLongBreak,
		};
		return updateStage[stage];
	};

	const switchStage = (index) => {
		const isYes =
			consumedSecond && stage !== index
				? window.confirm("Are you sure you want to switch?")
				: false;
		if (isYes) {
			reset();
			setStage(index);
		} else if (!consumedSecond) {
			setStage(index);
			setIsTimeUp(false);
		}
	};

	const reset = () => {
		setConsumedSecond(0);
		setTicking(false);
		setPomodo(POMODORO);
		setShortBreak(SHORTBREAK);
		setLongBreak(LONGBREAK);
		setSeconds(0);
	};

	const timeUp = () => {
		reset();
		setIsTimeUp(true);
	};

	const clockTicking = () => {
		const minutes = getTickingTime();
		const setMinutes = updateMinute();
		if (minutes === 0 && seconds === 0) {
			timeUp();
		} else if (seconds === 0) {
			setMinutes((minute) => minute - 1);
			setSeconds(59);
		} else {
			setSeconds((second) => second - 1);
		}
	};
	const startTimer = () => {
		setIsTimeUp(false);
		setTicking((ticking) => !ticking);
	};

	useEffect(() => {
		window.onbeforeunload = () => {
			return consumedSecond ? "Show warning" : null;
		};

		const timer = setInterval(() => {
			if (ticking) {
				setConsumedSecond((value) => value + 1);
				clockTicking();
			}
		}, 1);
		if (isTimeUp) {
			clearInterval(timer);
		}
		return () => {
			clearInterval(timer);
		};
	}, [poromodo, shortBreak, longBreak, ticking, seconds]);

	useEffect(() => {
		const STATE_FLOW = ['Pomodoro', 'Short Break', 'Long Break'];
		const formattedMinutes = String(getTickingTime()).padStart(2, '0');
		const formattedSeconds = String(seconds).padStart(2, '0');
		document.title = `${STATE_FLOW[stage]} - ${formattedMinutes}:${formattedSeconds}`;
	}, [stage, seconds, getTickingTime]);

	useEffect(() => {
		console.log('Stage:', stage);
		document.body.style.backgroundColor = `var(--${stage === 0 ? 'pomodoro' : stage === 1 ? 'short-break' : 'long-break'})`;
	  }, [stage]);
	  
	  
	

	return (
		<>
			<div className="min-h-screen  bg-red-100 font-inter">
				<div className="max-w-2xl mx-auto min-h-screen flex flex-col">
					<Navigation setOpenSetting={setOpenSetting} />
					<div className="mt-10">
						<Timer
							switchStage={switchStage}
							getTickingTime={getTickingTime}
							stage={stage}
							ticking={ticking}
							startTimer={startTimer}
							seconds={seconds}
							isTimeUp={isTimeUp}
							reset={reset}
						/>
					</div>
				</div>
				<ModalSettings
					openSetting={openSetting}
					setOpenSetting={setOpenSetting}
					pomodoroRef={pomodoroRef}
					shortBreakRef={shortBreakRef}
					longBreakRef={longBreakRef}
					updateTimeDefaultValue={updateTimeDefaultValue}
				/>
			</div>
		</>
	);
}
