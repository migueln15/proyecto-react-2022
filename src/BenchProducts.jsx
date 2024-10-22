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
    }, 30000)

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
              <th className="centered">Plaza Vea</th>
              <th className="centered">Oechsle</th>
              <th className="centered">Ripley</th>
              <th className="centered">Curacao</th>
              <th className="centered">Hiraoka</th>
              <th className="centered">Estilos</th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map(({ sku, nombre, carsa, curacao, hiraoka, estilos, ripley, oechsle, plazavea }) => {
                
                const minPrice = Math.min(
                  carsa > 0 ? carsa : Infinity, 
                  curacao > 0 ? curacao : Infinity, 
                  hiraoka > 0 ? hiraoka : Infinity, 
                  estilos > 0 ? estilos : Infinity,
                  ripley > 0 ? ripley : Infinity,
                  oechsle > 0 ? oechsle : Infinity,
                  plazavea > 0 ? plazavea : Infinity
                );

                const maxPrice = Math.max(
                  carsa > 0 ? carsa : -Infinity, 
                  curacao > 0 ? curacao : -Infinity, 
                  hiraoka > 0 ? hiraoka : -Infinity, 
                  estilos > 0 ? estilos : -Infinity,
                  ripley > 0 ? ripley : -Infinity,
                  oechsle > 0 ? oechsle : -Infinity,
                  plazavea > 0 ? plazavea : -Infinity
                );
                

                return (
                  <tr key={sku}>
                    <td className="label">{nombre}</td>
                    <td className="label">{sku}</td>
                    <td className={`
                      ${carsa === minPrice && carsa > 0 ? 'highlight' : 'alerta'} 
                      ${carsa === maxPrice && carsa > 0 ? 'max-price' : ''} 
                      centered carsahigh`}>
                      {carsa > 0 ? carsa : "-"}
                    </td>
                    <td className={`
                      ${plazavea === minPrice && plazavea > 0 ? 'highlight' : 'label'} 
                      ${plazavea === maxPrice && plazavea > 0 ? 'max-price' : ''} 
                      centered`}>
                      {plazavea > 0 ? plazavea : "-"}
                    </td>
                    <td className={`
                      ${oechsle === minPrice && oechsle > 0 ? 'highlight' : 'label'} 
                      ${oechsle === maxPrice && oechsle > 0 ? 'max-price' : ''} 
                      centered`}>
                      {oechsle > 0 ? oechsle : "-"}
                    </td>
                    <td className={`
                      ${ripley === minPrice && ripley > 0 ? 'highlight' : 'label'} 
                      ${ripley === maxPrice && ripley > 0 ? 'max-price' : ''} 
                      centered`}>
                      {ripley > 0 ? ripley : "-"}
                    </td>
                    <td className={`
                      ${curacao === minPrice && curacao > 0 ? 'highlight' : 'label'} 
                      ${curacao === maxPrice && curacao > 0 ? 'max-price' : ''} 
                      centered`}>
                      {curacao > 0 ? curacao : "-"}
                    </td>
                    <td className={`
                      ${hiraoka === minPrice && hiraoka > 0 ? 'highlight' : 'label'} 
                      ${hiraoka === maxPrice && hiraoka > 0 ? 'max-price' : ''} 
                      centered`}>
                      {hiraoka > 0 ? hiraoka : "-"}
                    </td>
                    <td className={`
                      ${estilos === minPrice && estilos > 0 ? 'highlight' : 'label'} 
                      ${estilos === maxPrice && estilos > 0 ? 'max-price' : ''} 
                      centered`}>
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