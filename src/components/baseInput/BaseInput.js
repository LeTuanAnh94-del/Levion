export default function BaseInput({
  type,
  placeholder,
  value,
  onChange,
  name,
  id,
  onBlur
}) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={
        "border rounded border-solid border-[#9387A8] w-full p-3 text-base"
      }
    />
  );
}
