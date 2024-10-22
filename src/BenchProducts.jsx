import axios from "axios"
import { useEffect, useState } from "react"

import "./BenchProducts.css"

const BenchProducts = () => {

  const [data, setData] = useState([])

  const fetchData = async () => {
    //axios.get(`http://192.168.68.100:8080/integra/GetAllBench`)
    axios.get(`https://bucker-web-api-10f06e076c5a.herokuapp.com/integra/GetAllBench`)
    .then(data => {
      console.log(data.data)
      setData(data.data)
    })
    .catch(e => {
      console.error(e)
    })
  }
  
  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 25000)

    return () => clearInterval(interval)
    // axios.get(`http://10.60.107.64:8080/integra/GetAllBench`)
    // .then(data => {
    //   //setData(data.data.data)
    //   console.log(data.data)
    //   setData(data.data)
    // })
    // .catch(e => {
    //   console.error(e)
    // })

  },[])

  

  return (
    <>
      <div className="bench-container">
        <table>
          <thead>
            <tr>
              <th className="centered">Nombre</th>
              <th className="centered">Sku</th>
              <th className="centered carsahigh">Carsa</th>
              <th className="centered">Oechsle</th>
              <th className="centered">Ripley</th>
              <th className="centered">Curacao</th>
              <th className="centered">Hiraoka</th>
              <th className="centered">Estilos</th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map(({ sku, nombre, carsa, curacao, hiraoka, estilos, ripley, oechsle }) => {
                
                const minPrice = Math.min(
                  carsa > 0 ? carsa : Infinity, 
                  curacao > 0 ? curacao : Infinity, 
                  hiraoka > 0 ? hiraoka : Infinity, 
                  estilos > 0 ? estilos : Infinity,
                  ripley > 0 ? ripley : Infinity,
                  oechsle > 0 ? oechsle : Infinity
                );
                

                return (
                  <tr key={sku}>
                    <td className="label">{nombre}</td>
                    <td className="label">{sku}</td>
                    <td className={`${carsa === minPrice && carsa > 0 ? 'highlight' : 'alerta'} centered carsahigh`}>
                      {carsa > 0 ? carsa : "-"}
                    </td>
                    <td className={`${oechsle === minPrice && oechsle > 0 ? 'highlight' : 'label'} centered`}>
                      {oechsle > 0 ? oechsle : "-"}
                    </td>
                    <td className={`${ripley === minPrice && ripley > 0 ? 'highlight' : 'label'} centered`}>
                      {ripley > 0 ? ripley : "-"}
                    </td>
                    <td className={`${curacao === minPrice && curacao > 0 ? 'highlight' : 'label'} centered`}>
                      {curacao > 0 ? curacao : "-"}
                    </td>
                    <td className={`${hiraoka === minPrice && hiraoka > 0 ? 'highlight' : 'label'} centered`}>
                      {hiraoka > 0 ? hiraoka : "-"}
                    </td>
                    <td className={`${estilos === minPrice && estilos > 0 ? 'highlight' : 'label'} centered`}>
                      {estilos > 0 ? estilos : "-"}
                    </td>
                  </tr>
                );
                
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default BenchProducts