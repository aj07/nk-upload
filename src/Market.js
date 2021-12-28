import { useEffect, useState } from "react";
import { addJsonToStorage, addFileToStorage } from "./addToStorage";
import { CSVLink, CSVDownload } from "react-csv";

const Minter = (props) => {
  const [status, setStatus] = useState("Status");
  const [images, setImages] = useState([]);
  const [json, setJSON] = useState([]);
  const [csv, setCSV] = useState([]);
  const [gencsv, setGencsv] = useState(false);

  async function getfile(file) {
    return await new Response(file).json();
  }

  async function uploadMetadata() {
    setStatus("Uploading...");
    try {
      const imagesArr = images;
      const jsonFileArr = json;
      const jsonArr = [];

      imagesArr.sort((a, b) => a.name.localeCompare(b.name));
      jsonFileArr.sort((a, b) => a.name.localeCompare(b.name));

      const jsonUrls = [];
      for (var file of jsonFileArr) {
        jsonArr.push(await getfile(file));
      }

      for (var i = 0; i < jsonArr.length; i++) {
        setStatus(`Uploading...${i + 1} of ${jsonArr.length}`);

        const added = await addJsonToStorage(jsonArr[i], imagesArr[i]);
        jsonUrls.push(added.url);
      }
      setStatus("Upload complete");
      console.log(jsonUrls);
      setCSV([jsonUrls]);
      setGencsv(true);
    } catch (err) {
      setStatus(`Error: ${err}`);
    }
  }

  return (
    <div>
      <h1>Upload NFT Metadata</h1>
      <h3> Select Images: </h3>
      <input
        type="file"
        multiple
        onChange={(e) => {
          setImages(Array.from(e.target.files));
        }}
      />
      <h3> Select JSON files: </h3>
      <input
        type="file"
        multiple
        onChange={(e) => {
          setJSON(Array.from(e.target.files));
        }}
      />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <button onClick={uploadMetadata}>
        <b>Upload</b>
      </button>
      <br/>
      <br/>
      {gencsv && <CSVLink data={csv} target="_blank">Download CSV</CSVLink>  }

      <div style={{ position: "fixed", top: "90vh", color: "green" }}>
        {status}
      </div>

      {/* <table>
        <tbody>
          <tr>
            <td>
              <h3> Token Address : </h3>
              <input
                type="text"
                placeholder="Address"
                value={tokenAddress}
                onChange={(event) => setTokenAddress(event.target.value)}
              />
            </td>
            <td>
              <h3> Mint To : </h3>
              <input
                type="text"
                placeholder="Address"
                value={mintTo}
                onChange={(event) => setMintTo(event.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <h3> Images: </h3>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  setImages(Array.from(e.target.files));
                }}
              />
            </td>
            <td>
              <h3> JSON files: </h3>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  setJSON(Array.from(e.target.files));
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={onMintPressed}>
                <b>Mint NFT</b>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <h3> CSV file: </h3>
              <input
                type="file"
                onChange={(e) => {
                  setCSV(e.target.files[0]);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={(e) => onMintCSV()}>
                <b>Mint NFT from CSV</b>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <h2> Transfer : </h2>
      <table>
        <tbody>
          <tr>
            <td>
              <h3> Token Address : </h3>
              <input
                type="text"
                placeholder="Token Address"
                value={tokenAddress2}
                onChange={(event) => setTokenAddress2(event.target.value)}
              />
            </td>
            <td>
              <h3> Token Id : </h3>
              <input
                type="text"
                placeholder="tokenID"
                value={tokenId}
                onChange={(event) => setTokenId(event.target.value)}
              />
            </td>
            <td>
              <h3> Receiver Address : </h3>
              <input
                type="text"
                placeholder="Receiver Address"
                value={receiverAddress}
                onChange={(event) => setReceiverAddress(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={transferAsTokenOwner}>
                Transfer as token owner
              </button>
            </td>
            <td>
              <button onClick={transferAsContractOwner}>
                Transfer as contract owner
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p id="status" style={{ color: "limegreen" }}>
        {status}
      </p> */}
    </div>
  );
};

export default Minter;
