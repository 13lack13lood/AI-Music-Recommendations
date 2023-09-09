import "../styles/Button.css";

const Button = ({ text, onclick }) => {
	return (
		<div className="button" onClick={() => onclick()}>
			<span>{text}</span>
		</div>
	);
};

export default Button;
