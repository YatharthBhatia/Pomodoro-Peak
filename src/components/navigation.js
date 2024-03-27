import React from "react";
import { FiSettings} from "react-icons/fi";

function Navigation({ setOpenSetting }) {
	return (
		<>
			<div className="pt-5 flex justify-between w-11/12 mx-auto">
				<div className="items-center" />
				<FiSettings
					className="text-black text-2xl cursor-pointer items-center"
					onClick={() => setOpenSetting(true)}
				/>
			</div>
		</>
	);
}

export default React.memo(Navigation);
