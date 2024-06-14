import { useState, useEffect } from "react"
import style from './Uploads.module.css'
import { Arquivo } from "../Arquivo/Arquivo"


export function Uploads() {

  const [file, setFile] = useState([])
  const [tempFile, setTempFile] = useState(null)
  const [descricao, setDescricao] = useState('');
  const [showImage, setShowImage] = useState(false);


  async function handleFile(event, description) {
    // event.preventDefault()
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files[0];
      const base64File = await toBase64(files);
      setTempFile({ base64File: base64File, description: description, type: files.type, name: files.name })

    } else {
      console.log("nenhum arquivo selecionado")
    }
  }

  function handleDescricao(event) {
    setDescricao(event.target.value)
  }

  function handleUpload(event) {
    event.preventDefault();
    if (tempFile) {
      const newFile = { ...tempFile, description: descricao };
      setFile(prevFiles => {
        const updatedFiles = [...prevFiles, newFile];
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
        return updatedFiles;
      });
      setTempFile(null);
      setDescricao('');
    }
  }

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    setFile(savedFiles);
  }, []);




  return (
    <section className={style.upload}>
      <form className={style.form}>
        <h1>Adicione um arquivo de imagem ou video</h1>
        <label>Adicione um arquivo:</label>
        <input type="file" onChange={(event) => handleFile(event, descricao)}></input>
        <label>Adicione uma descricao:</label>
        <textarea
          type="text"
          placeholder="uma memoria de quando eu fui para Miami..."
          value={descricao}
          onChange={handleDescricao}
        />
        <button onClick={handleUpload}>Upload</button>
      </form>

      {file.length > 0 ? ( // Renderiza a imagem se showImage for true
        <>
          <h3>Suas imagens e videos renderizados</h3>
          <div className={style.arquivos}>
            {file.map((item, index) => (
              <Arquivo key={index} file={item} descricao={item.description} /> // Passa o objeto file para Arquivo
            ))}
          </div>
        </>
      ) : (
        <h3>Sem imagens ou videos renderizados</h3>
      )}
    </section>
  );

}

async function toBase64(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve) => {
    reader.onload = () => resolve(reader.result);
  });
}