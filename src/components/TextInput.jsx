import "../styles/TextInput.css";

const TextInput = ({ placeholder, onChange }) => {
	return (
		<div class="outside">
			<input class="input" type="text" placeholder={placeholder} onChange={onChange}></input>
			<span class="focus-border"></span>
		</div>
	);
};

export default TextInput;
