import * as React from "react";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.scss'
import {
  Header,
  Card,
  Heading,
  Search,
  Filters,
  Pagination,
  Sort
} from '../components'

import items from './data.json'

import { StaticImage } from "gatsby-plugin-image"
import InfiniteScroll from 'react-infinite-scroller';
// markup
const IndexPage = () => {
  const [active, setActive] = useState(null);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState(items);
  const [str, setStr] = useState('');
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    price: [30, 180],
    genre: ''
  });


  const onSearch = (e) => {
    let value = e.target.value;
    setStr(value)
    setOffset(0)
    let data = items;
    if (value === '') {
      setData(items)
    } else {
      if (filters.category !== '') {
        data = data.filter((item) => item.category === filters.category)
      }
      if (filters.genre !== '') {
        data = data.filter((item) => item.genre === filters.genre)
      }
      if (filters.price !== "") {
        data = data.filter((item) => item.price < filters.price[1] && item.price > filters.price[0])
      }
      data = data.filter((item) => ((item.name).toLocaleLowerCase()).includes(value.toLocaleLowerCase()))
      setData(data)
    }

  }

  const onClickShow = (value) => {
    if (active === value) {
      setActive(null)
      setData(items)
    }
    else {
      setData(items.filter((item) => item.sort === value))
      setActive(value)
      setOffset(0)
    }

  }

  const onFilter = (category, genre, price) => {
    setFilters({
      category: category,
      price: price,
      genre: genre
    })
    setOffset(0)
    let data = items;
    if (category !== '') {
      data = data.filter((item) => item.category === category)
    }
    if (genre !== '') {
      data = data.filter((item) => item.genre === genre)
    }
    if (str !== '') {
      data = data.filter((item) => ((item.name).toLocaleLowerCase()).includes(str.toLocaleLowerCase()))
    }
    setData(data.filter((item) => item.price < price[1] && item.price > price[0]))

  }

  return (
    <main className="home">
      <Header />
      <Sort
        show={showSort}
        onClose={() => setShowSort(false)}
        onChange={(value) => {
          setData(items.filter((item) => item.sort === value))
          setOffset(0)
          setShowSort(false)
        }}
      />
      {
        showFilter ? (
          <div className="filter-responsive">
            <label className="filter-responsive__title">
              <StaticImage src="../assets/images/filter.png" />
              Filtering box</label>
            <Filters
              isResponsive
              filters={filters}
              onFilterResponsive={(category, genre, price) => {
                onFilter(category, genre, price)
                setShowFilter(false)
              }}
            />
          </div>
        ) : (
          <div className="container-fluid">
            <div className=" mt-5 mb-5">
              <Search
                placeholder="search"
                value={str}
                onChange={onSearch}
              />
            </div>
            <div className="d-flex justify-content-around home__action-desktop">
              <button onClick={() => setShowFilter(true)} className="d-flex justify-content-center">
                <div className="mt-1"><StaticImage src="../assets/images/filter.png" /></div>
                Filtering box
              </button>
              <button onClick={() => setShowSort(true)} className="d-flex justify-content-center" >
                <div><StaticImage src="../assets/images/sort.png" /></div>
                Sorting by
              </button>
            </div>
            <div className="row">
              <div className="col-3 home__hide-desktop">
                <Filters
                  filters={filters}
                  onFilter={onFilter}
                />
              </div>
              <div className="col-lg-9 col-12 p-5">
                <Heading title={`${filters.genre} Books`} />
                <div className="home__show-box">
                  <div className="mr-3">Showing By:</div>
                  <button className={active === 0 && 'home__show-box__active'}
                    onClick={() => onClickShow(0)}>Bestselling</button>
                  <button
                    className={active === 1 && 'home__show-box__active'}
                    onClick={() => onClickShow(1)}>Popular</button>
                </div>
                <div className="row home__hide-desktop">
                  {
                    data.slice(0, (offset + 1) * 9).map((item, index) => {
                      return (
                        <div className="col-lg-4 col-md-6 col-12 mb-4" key={index}>
                          <Card item={item} />
                        </div>
                      )
                    })
                  }
                  {
                    data.length === 0 && (
                      <h1 className="home__not-found">Book Not Found!</h1>
                    )
                  }
                </div>
                <InfiniteScroll
                  className="row home__products"
                  pageStart={0}
                  loadMore={() => {
                    let flag = true
                    if (((offset + 1) * 9 < items.length) && flag) {
                      setOffset(offset + 1)
                      flag = false
                      setTimeout(function () { flag = true }, 3000);
                    }
                  }}
                  hasMore={true}
                  threshold={120}
                >
                  {
                    data.slice(0, (offset + 1) * 9).map((item, index) => {
                      return (
                        <div className="col-lg-4 col-md-6 col-12 mb-4" key={index}>
                          <Card item={item} />
                        </div>
                      )
                    })
                  }
                </InfiniteScroll>
                <div className="home__divider home__hide-desktop"></div>
                <div className="home__pagination">
                  <Pagination
                    limit={9}
                    total={Math.ceil((data.length) / 9)}
                    onChange={(page) => {
                      setOffset((page - 1) * 9)
                    }} />
                </div>
              </div>
            </div>
          </div>
        )
      }

    </main>
  )
}

export default IndexPage
