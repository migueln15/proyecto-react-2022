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
              <th className="centered">Saga MKT</th>
              <th className="centered">Falabella</th>
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
              data && data.map(({ sku, nombre, carsa, curacao, hiraoka, estilos, ripley, oechsle, plazavea, falabella, falamkt }) => {
                
                const prices = [
                  carsa, 
                  curacao, 
                  hiraoka, 
                  estilos,
                  ripley,
                  oechsle,
                  plazavea,
                  falabella,
                  falamkt
                ]
                const validPrices = prices.filter(price => price > 0);
                const sortedPrices = [...validPrices].sort((a, b) => a - b)

                const minPrice = sortedPrices[0]
                const secondMinPrice = sortedPrices[1]
                const maxPrice = Math.max(...validPrices)

                const getBestWorstClassName = (value) => {
                  if (value === minPrice && value > 0) return 'best-price'
                  if (value === maxPrice && value > 0) return 'worst-price'
                  return 'alert-price'
                }

                const getKpiProduct = (value) => {
                  if (value === minPrice && value > 0)
                    return parseFloat((secondMinPrice - value) / secondMinPrice).toFixed(2) * 100
                  if (value > minPrice && value > 0)
                    return parseFloat((value - minPrice) / minPrice).toFixed(2) * 100
                  
                }
      
                return (
                  <tr key={sku}>
                    <td className="label">{nombre}</td>
                    <td className="label">{sku}</td>
                    <td className={`${getBestWorstClassName(carsa)} centered carsahigh`}>
                      {carsa > 0 ? carsa : "-"}
                      {carsa === minPrice && <span className="kpi-product-positive">{`(${getKpiProduct(carsa)}%)`}</span>}
                      {carsa > minPrice && <span className="kpi-product-negative">{`(${getKpiProduct(carsa)}%)`}</span>}
                    </td>
                    <td className={`
                      ${falamkt === minPrice && falamkt > 0 ? 'highlight' : 'label'} 
                      ${falamkt === maxPrice && falamkt > 0 ? 'max-price' : ''} 
                      centered`}>
                      {falamkt > 0 ? falamkt : "-"}
                    </td>
                    <td className={`
                      ${falabella === minPrice && falabella > 0 ? 'highlight' : 'label'} 
                      ${falabella === maxPrice && falabella > 0 ? 'max-price' : ''} 
                      centered`}>
                      {falabella > 0 ? falabella : "-"}
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