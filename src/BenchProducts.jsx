import axios from "axios"
import { useEffect, useState } from "react"

import "./BenchProducts.css"
import { Navigate } from "react-router-dom"

const BenchProducts = () => {

  const [data, setData] = useState([])

  const fetchData = async () => {
    //axios.get(`http://192.168.68.100:8080/integra/GetAllBench`)
    axios.get(`https://bucker-web-api-10f06e076c5a.herokuapp.com/integra/GetAllBench`)
    .then(data => {
      console.log(data.data)
      const sortedData = data.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setData(sortedData)
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

  //if (!localStorage.getItem("tokenIR")) return <Navigate to="/login"/>

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
              data && data.map(({ sku, 
                                  nombre, 
                                  is_inprogress,

                                  carsa_price,
                                  sagamkt_price,
                                  falabella_price,
                                  plazavea_price,
                                  oechsle_price,
                                  ripley_price,
                                  curacao_price,
                                  hiraoka_price,
                                  estilos_price,

                                  carsa_url,
                                  sagamkt_url,
                                  falabella_url,
                                  plazavea_url,
                                  oechsle_url,
                                  ripley_url,
                                  curacao_url,
                                  hiraoka_url,
                                  estilos_url}) => {
                
                const prices = [
                  carsa_price, curacao_price, hiraoka_price, estilos_price, ripley_price, oechsle_price, plazavea_price, falabella_price, sagamkt_price
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
                    return (parseFloat((secondMinPrice - value) / secondMinPrice).toFixed(2) * 100).toFixed(0)
                  if (value > minPrice && value > 0)
                    return (parseFloat((value - minPrice) / minPrice).toFixed(2) * 100).toFixed(0)
                  
                }
      
                return (
                  <tr key={sku} className={is_inprogress === 1 ? "inprogress-row" : ""}>
                    <td className="label">{nombre}</td>
                    <td className="label">{sku}</td>
                    <td className={`${getBestWorstClassName(carsa_price)} centered carsahigh`}>
                      {carsa_url ? (
                        <a href={carsa_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {carsa_price > 0 ? carsa_price : "-"}
                          {carsa_price === minPrice && <span className="kpi-product-positive">{`- ${getKpiProduct(carsa_price)}%`}</span>}
                          {carsa_price > minPrice && <span className="kpi-product-negative">{`+ ${getKpiProduct(carsa_price)}%`}</span>}
                        </a>
                      ):(
                        <>
                          {carsa_price > 0 ? carsa_price : "-"}
                          {carsa_price === minPrice && <span className="kpi-product-positive">{`-${getKpiProduct(carsa_price)}%`}</span>}
                          {carsa_price > minPrice && <span className="kpi-product-negative">{`+${getKpiProduct(carsa_price)}%`}</span>}
                        </>
                      )}
                    </td>
                    <td className={`
                      ${sagamkt_price === minPrice && sagamkt_price > 0 ? 'highlight' : 'label'} 
                      ${sagamkt_price === maxPrice && sagamkt_price > 0 ? 'max-price' : ''} 
                      centered`}>
                      {sagamkt_url ? (
                        <a href={sagamkt_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {sagamkt_price > 0 ? sagamkt_price : "-"}
                        </a>
                      ):(
                        <>
                          {sagamkt_price > 0 ? sagamkt_price : "-"}
                        </>
                      )}
                    </td>
                    <td className={`
                      ${falabella_price === minPrice && falabella_price > 0 ? 'highlight' : 'label'} 
                      ${falabella_price === maxPrice && falabella_price > 0 ? 'max-price' : ''} 
                      centered`}>
                      {falabella_url ? (
                        <a href={falabella_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {falabella_price > 0 ? falabella_price : "-"}
                        </a>
                      ):(
                        <>
                          {falabella_price > 0 ? falabella_price : "-"}
                        </>
                      )}
                    </td>
                    <td className={`
                      ${plazavea_price === minPrice && plazavea_price > 0 ? 'highlight' : 'label'} 
                      ${plazavea_price === maxPrice && plazavea_price > 0 ? 'max-price' : ''} 
                      centered`}>
                      {plazavea_url ? (
                        <a href={plazavea_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {plazavea_price > 0 ? plazavea_price : "-"}
                        </a>
                      ):(
                        <>
                          {plazavea_price > 0 ? plazavea_price : "-"}
                        </>
                      )}
                    </td>
                    <td className={`
                      ${oechsle_price === minPrice && oechsle_price > 0 ? 'highlight' : 'label'} 
                      ${oechsle_price === maxPrice && oechsle_price > 0 ? 'max-price' : ''} 
                      centered`}>
                      {oechsle_url ? (
                        <a href={oechsle_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {oechsle_price > 0 ? oechsle_price : "-"}
                        </a>
                      ):(
                        <>
                          {oechsle_price > 0 ? oechsle_price : "-"}
                        </>
                      )}
                    </td>
                    <td className={`
                      ${ripley_price === minPrice && ripley_price > 0 ? 'highlight' : 'label'} 
                      ${ripley_price === maxPrice && ripley_price > 0 ? 'max-price' : ''} 
                      centered`}>
                      {ripley_url ? (
                        <a href={ripley_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {ripley_price > 0 ? ripley_price : "-"}
                        </a>
                      ):(
                        <>
                          {ripley_price > 0 ? ripley_price : "-"}
                        </>
                      )}
                    </td>
                    <td className={`
                      ${curacao_price === minPrice && curacao_price > 0 ? 'highlight' : 'label'} 
                      ${curacao_price === maxPrice && curacao_price > 0 ? 'max-price' : ''} 
                      centered`}>
                      {curacao_url ? (
                        <a href={curacao_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {curacao_price > 0 ? curacao_price : "-"}
                        </a>
                      ):(
                        <>
                          {curacao_price > 0 ? curacao_price : "-"}
                        </>
                      )}
                    </td>
                    <td className={`
                      ${hiraoka_price === minPrice && hiraoka_price > 0 ? 'highlight' : 'label'} 
                      ${hiraoka_price === maxPrice && hiraoka_price > 0 ? 'max-price' : ''} 
                      centered`}>
                      {hiraoka_url ? (
                        <a href={hiraoka_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {hiraoka_price > 0 ? hiraoka_price : "-"}
                        </a>
                      ):(
                        <>
                          {hiraoka_price > 0 ? hiraoka_price : "-"}
                        </>
                      )}
                    </td>
                    <td className={`
                      ${estilos_price === minPrice && estilos_price > 0 ? 'highlight' : 'label'} 
                      ${estilos_price === maxPrice && estilos_price > 0 ? 'max-price' : ''} 
                      centered`}>
                      {estilos_url ? (
                        <a href={estilos_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {estilos_price > 0 ? estilos_price : "-"}
                        </a>
                      ):(
                        <>
                          {estilos_price > 0 ? estilos_price : "-"}
                        </>
                      )}
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