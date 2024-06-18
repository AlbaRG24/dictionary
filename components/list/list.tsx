export const List = ({ list }) => {
  return (
    <div>
      {list ? (
        <ul>
          {list?.map((item, index) => (
            <li key={index + 1}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No {list} available</p>
      )}
    </div>
  );
};
