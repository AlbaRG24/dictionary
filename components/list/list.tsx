export const List = ({ list }: { list: Array<string> }) => {
  return (
    <div>
      <ul>
        {list?.map((item: string, index: number) => (
          <li key={index + 1}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
