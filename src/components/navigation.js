import React from "react";
import { FiSettings, FiAperture } from "react-icons/fi";

function Navigation({ setOpenSetting }) {
	return (
		<>
			<nav className="pt-5 flex justify-between w-11/12 mx-auto">
				<div className="items-center" />
				<FiSettings
					className="text-black text-2xl cursor-pointer"
					onClick={() => setOpenSetting(true)}
				/>
			</nav>
		</>
	);
}

export default React.memo(Navigation);
