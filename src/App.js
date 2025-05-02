import { useState } from "react";
import "../src/App.css";

function App() {
  const [chipsContainer, setchipsContainer] = useState([]);
  const [input, setInput] = useState("");

  function handelTags(e) {
    if (e.key === "Enter") {
      if (!(input === 0) && !input.includes(" ")) {
        setchipsContainer((prev) => [
          ...prev,
          { name: input, id: Math.ceil(Math.random() * 1000) },
        ]);
      }
      setInput("");
    }
  }
   function handelOnChnage(e){
    setInput(e.target.value);



  }

  function handelDelete(id) {
    function filterData() {
      return chipsContainer.filter((item) => item.id !== id);
    }

    setchipsContainer((prev) => filterData());
  }
  console.log(chipsContainer);

  return (
    <>
      <div className="chip-container">
        <h1>Chips Input</h1>
        <input
          name="chips"
          type="text"
          placeholder="add tags"
          onKeyDown={handelTags}
          onChange={handelOnChnage}
          value={input}
        />
        <br></br>
        <div></div>
        <div className="tags">
          {chipsContainer.map((tag) => {
            return (
              <>
                <div key={tag?.id} className="span-tag">
                  <span>{tag?.name}</span>
                  <button
                    onClick={() => {
                      handelDelete(tag.id);
                    }}
                  >
                    X
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
