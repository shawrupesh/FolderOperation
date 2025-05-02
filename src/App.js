import logo from './logo.svg';

function App() {
  const [data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageNextIndex, setNextPageIndex] = useState(10);
  const [pagePrevIndex, setPrevPageIndex] = useState(0);
  const[clickedPage, setClickedPage]=useState(1)

  const url = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    async function fetchData() {
      const apiData = await fetch(url);
      const jsonData = await apiData.json();
      setData(jsonData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setPaginationData(data.slice(pagePrevIndex, pageNextIndex));
    setPageNo(Math.ceil(data.length / 10));
  }, [data, pageNextIndex, pagePrevIndex]);

  console.log("data", data);

  function handelPagination(move) {
    if (move === "Next") {
      setNextPageIndex((prev) => prev + 10);
      setPrevPageIndex((prev) => prev + 10);
    }
    if (move === "Prev") {
      setNextPageIndex((prev) => prev - 10);
      setPrevPageIndex((prev) => prev - 10);
    }
    if (typeof move === "number") {
      setClickedPage(move)
      setNextPageIndex(10 * move);
      setPrevPageIndex(10 * move - 10);
    }
  }
  console.log("Pagination", pagePrevIndex, pageNextIndex);

  if(data.length==0){
    return <div style={{width:'fit-content',margin:'auto'}}>
      <h1>Loading............................</h1>
    </div>
  }

  return (
    <>
      <h1>Pagination</h1>
      <div className="container">
        {paginationData.map((item) => {
          return (
            <div className="subcontainer" key={item.id}>
              <Card product={item} setData={setData} />
            </div>
          );
        })}
      </div>
    {!(data.length===0)  &&
    
    <div className="pagination">
        <button
          disabled={pagePrevIndex === 0}
          onClick={() => {
            handelPagination("Prev");
          }}
        >
          Prev Page
        </button>
        <button
          disabled={data.length === pageNextIndex}
          onClick={() => {
            handelPagination("Next");
          }}
        >
          Next Page
        </button>
        {[...Array(pageNo)].map((i, index) => {
          return (
            <button
              onClick={() => {
                handelPagination(index + 1);
              }}
              style={{ marginLeft: "5px", cursor: "pointer", backgroundColor:`${(index+1)*10===pageNextIndex ? 'gray':''}` }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    }
      
    </>
  );
}

export default App;
