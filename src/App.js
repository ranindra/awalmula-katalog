import axios from 'axios';
import { useEffect, useState } from 'react';
// import XMLParser from 'react-xml-parser';
//COMPONENTS
import Navbar from './components/navbar/Navbar';
import { Col, Container, Row, Image } from 'react-bootstrap';
//CSS IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import CardProduct from './components/card/CardProduct';

function App() {
  const [data_kat, setKat] = useState([]);
  const [data_prod, setProd] = useState([]);
  const [pencarian, setPencarian] = useState("");
  const [kategori, setKategori] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState();

  useEffect(() => {
    fetchListCategories();
    fetchListProduct();
    // fetchSearchProduct();
  }, []);

  function fetchListCategories() {
    //get data request
    axios.get('https://staging-am.awalmula.co.id/rest/default/V1/categories', {
      "Content-Type": "application/xml; charset=utf-8"
    }).then(res => {
      //Storing users detail in state array object
      // console.log(res.data.children_data);
      setKat(res.data.children_data);
    });
  }

  function fetchListProduct() {
    //get data request
    axios.get('https://staging-am.awalmula.co.id/rest/default/V1/products?searchCriteria[pageSize]=10', {
      "Content-Type": "application/xml; charset=utf-8"
    }).then(res => {
      //Storing users detail in state array object
      setProd(res.data.items);
      // console.log(res.data);
      // console.log(res.data.items[0].media_gallery_entries[0].file)
    });
  }

  function fetchSearchProduct(e) {
    // const keyword = pencarian;
    //get data request
    axios.get('https://staging-am.awalmula.co.id/rest/default/V1/products?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=%25' + e + '%25&searchCriteria[filter_groups][0][filters][0][condition_type]=like', {
      "Content-Type": "application/xml; charset=utf-8"
    }).then(res => {
      //Storing users detail in state array object
      setProd(res.data.items);
      // console.log(res.data);
    });
  }

  function onSelectedIdx(e) {
    // console.log(e.target.id);
    setKategori(data_kat[e.target.id]);
  }

  const priceFormatter = (price) => {
    // Trilyun
    if (price / 1000000000000 >= 1) {
      price = parseFloat((price / 1000000000000).toFixed(2)).toString() + " Trilyun";
    }
    // Milyar
    else if (price / 1000000000 >= 1) {
      price = parseFloat((price / 1000000000).toFixed(2)).toString() + ".000.000.000";
    }
    // Juta
    else if (price / 1000000 >= 1) {
      price = parseFloat((price / 1000000).toFixed(2)).toString() + ".000.000";
    }
    // Ribu
    else if (price / 1000 >= 1) {
      price = parseFloat((price / 1000).toFixed(2)).toString() + ".000";
    }
    return price;
  }

  return (
    <div className='app'>
      <Navbar
        data_kategori={data_kat}
        onSearch={e => setPencarian(e.target.value)}
        onSearchBtn={() => fetchSearchProduct(pencarian)}
        selectKat={(e) => onSelectedIdx(e)}
      />
      <Container fluid className="cont-wrap">
        <Row>
          {kategori !== null && kategori !== undefined ?
            <Col xs={12} sm={6} md={3} className='side-card'>
              <h5>{kategori.name}</h5>
              <div className='side-wrap'>
                {
                  kategori.children_data !== null && kategori.children_data !== undefined && kategori.children_data.length !== 0 ?
                    kategori.children_data.map((sub, i) => {
                      return (
                        <div id={i} className='sub-cat' onClick={()=>fetchSearchProduct(sub.name)}>{sub.name}</div>
                      )
                    })
                    : null
                }
              </div>
            </Col>
            : null}
          <Col xs={12} sm={6} md={9}>
            <Row>
              {
                data_prod !== null && data_prod !== undefined && data_prod.length !== 0 ?
                  data_prod.map((prod, i) => {
                    return (
                      <Col sm>
                        <CardProduct
                          img_src={"https://media-www.awalmula.co.id/catalog/product/cache/06a2b2d0b3b3bcee577608c878a0377c" + prod.media_gallery_entries[0].file}
                          id={i}
                          // brand={prod.extension_attributes.brand[0].brand_name}
                          name={prod.name}
                          price={priceFormatter(prod.price)}
                        />
                      </Col>

                    )
                  })
                  : null
              }

            </Row>

          </Col>
        </Row>
      </Container>
    </div>

  );
}

export default App;
