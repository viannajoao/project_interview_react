import style from './Arquivo.module.css';


export function Arquivo({ file, descricao }) {

  console.log(file)
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');


  return (
  
      <div className={style.arquivo}>
        {isImage && <img src={file.base64File} alt={file.name}></img>}
        {isVideo && <video src={file.base64File} alt={file.name} controls></video>}
        <p>{descricao}</p>
      </div>
    
  )
}