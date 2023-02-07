import { useField } from '../hooks/hooks';
const CreateNew = (props) => {
  const [content, resetContent] = useField('text');
  const [author, resetAuthor] = useField('text');
  const [info, resetInfo] = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button
          type="button"
          onClick={() => {
            resetAuthor();
            resetContent();
            resetInfo();
          }}
        >
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
