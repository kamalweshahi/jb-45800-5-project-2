import "./SwitchButton.css";

interface SwitchButtonProps {
  checked: boolean;
  onChange: () => void;
}

export default function SwitchButton(props: SwitchButtonProps) {
  return (
    <label className="SwitchButton">
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />
      <span></span>
    </label>
  );
}
