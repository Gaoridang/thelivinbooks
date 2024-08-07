
interface Props extends ComponentProps<"textarea"> {}

const TextArea = ({ name, ...props }: Props) => {
  return (
    <textarea
      name={name}
      id={props.id}
      className="resize-none border"
    ></textarea>
  );
};

export default TextArea;
