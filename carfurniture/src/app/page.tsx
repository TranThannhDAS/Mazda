"use client";
import styles from "./styleHomePage.module.scss";
import stylesD from "../components/Items/styleItems.module.scss";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components

import Image from "next/image";
import InputSearch from "@/components/Items/InputSearch";
import SlideCategory from "@/components/Slide/SlideCategory";
import { SiShopee } from "react-icons/si";
import http from "@/utils/http";
import Link from "next/link";
import { MdSkipPrevious } from "react-icons/md";
import { BiSkipNext } from "react-icons/bi";
import dynamic from "next/dynamic";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const SlideHome = dynamic(() => import("@/components/Slide/SlideHome"), {
  loading: () => (
    <div className="w-full h-[450px] bg-[aliceblue] flex relative flex-wrap sm:flex-nowrap"></div>
  ),
});
export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dataProducts, setDataProducts] = useState<
    {
      id: number;
      name: string;
      price: number;
      price_After: number;
      categoryName: string;
      description: string;
      urlShoppe: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const [dataNews, setDataNews] = useState<
    {
      id: number;
      name: string;
      create_Date: string;
      categoryName: string;
      content: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageChoice, setPageChoice] = useState<number>(1);
  const [pageIndexN, setPageIndexN] = useState<number>(0);
  const [pageChoiceN, setPageChoiceN] = useState<number>(1);
  const [pageIndexG, setPageIndexG] = useState<number>(0);
  const [pageChoiceG, setPageChoiceG] = useState<number>(1);
  const [dataGuid, setDataGuid] = useState<
    {
      id: number;
      name: string;
      create_Date: string;
      content: string;
      categoryName: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const [dataSoft, setDataSoft] = useState<
    {
      id: number;
      name: string;
      link: string;
    }[]
  >([]);
  const [dataList, setDataList] = useState<{ id: number; name: string }[]>([]);
  const [caseChose, setCaseChose] = useState<{
    product: { categoryId: number; categoryName: string };
    news: { categoryId: number; categoryName: string };
    guide: { categoryId: number; categoryName: string };
  }>({
    product: { categoryId: 0, categoryName: "" },
    news: { categoryId: 0, categoryName: "" },
    guide: { categoryId: 0, categoryName: "" },
  });
  const rrrd = useRef<boolean>(false);

  const [loadingType, setLoadingType] = useState<boolean>(false);
  const fetS = async () => {
    setLoadingType(true);
    setDataList([]);
    const resT = await http.get("CategoryType/GetAll");
    rrrd.current = true;
    const resCatePr = await http.get<
      { categoryName: string; categoryId: number }[]
    >(`Category/GetAll/${resT.data[0].name}`);
    const resCateNews = await http.get<
      { categoryName: string; categoryId: number }[]
    >(`Category/GetAll/${resT.data[1].name}`);
    const resCateGuide = await http.get<
      { categoryName: string; categoryId: number }[]
    >(`Category/GetAll/${resT.data[2].name}`);
    setCaseChose({
      product: resCatePr.data[0],
      news: resCateNews.data[0],
      guide: resCateGuide.data[0],
    });
    setDataList(
      resCatePr.data.map((r) => ({ id: r.categoryId, name: r.categoryName }))
    );
    fetSDataNews();
    fetSDataGuid();
    const res = await http.get("Button/GetAll");
    setDataSoft(res.data);
    setLoadingType(false);
  };
  const rrr = useRef<boolean>(false);
  const fetSDataNews = async (index: number = 1, name?: string) => {
    const resNews = await http.post("Blog/GetPaginationProduct", {
      pageIndex: index,
      pageSize: 4,
    });
    setPageIndexN(resNews.data.totalPageIndex);
    setLoadingIndex(0);
    setDataNews(resNews.data.data);
  };
  const fetSDataGuid = async (index: number = 1, name?: string) => {
    const resGuide = await http.post("Guide/GetPaginationProduct", {
      pageIndex: index,
      pageSize: 4,
    });
    setPageIndexG(resGuide.data.totalPageIndex);
    setLoadingIndex(0);
    setDataGuid(resGuide.data.data);
  };
  const [loadingOpen, setLoadingOpen] = useState<string>("");
  const fetSDataProduct = async (index: number = 1, name?: string) => {
    if (rrrd.current) {
      if (caseChose.product.categoryName !== "Tất Cả Sản Phẩm") {
        if (name) {
          setLoading(true);
          const res = await http.post("Product/GetPaginationProduct", {
            pageIndex: index,
            pageSize: 8,
            search_Name: name,
            search_CategoryName: caseChose.product?.categoryName,
          });
          setPageIndex(res.data.totalPageIndex);
          setDataProducts(res.data.data);
          setLoading(false);
        } else {
          rrrd.current = false;

          const res = await http.post("Product/GetPaginationProduct", {
            pageIndex: index,
            pageSize: 8,
            search_CategoryName: caseChose.product?.categoryName,
          });
          setPageIndex(res.data.totalPageIndex);
          setDataProducts(res.data.data);
          // } else {
          //   const res = await http.post("Product/GetPaginationProduct", {
          //     pageIndex: index,
          //     pageSize: 8,
          //   });
          //   setPageIndex(res.data.totalPageIndex);
          //   setDataProducts(res.data.data);
          //   setLoadingType(false);
          // }
        }
      } else {
        if (name) {
          setLoading(true);
          const res = await http.post("Product/GetPaginationProduct", {
            search_Name: name,
          });
          setPageIndex(res.data.totalPageIndex);
          setDataProducts(res.data.data);
          setLoading(false);
        } else {
          rrrd.current = false;
          const res = await http.post("Product/GetPaginationProduct", {
            pageIndex: index,
            pageSize: 8,
          });
          setPageIndex(res.data.totalPageIndex);
          setDataProducts(res.data.data);
          // } else {
          //   const res = await http.post("Product/GetPaginationProduct", {
          //     pageIndex: index,
          //     pageSize: 8,
          //   });
          //   setPageIndex(res.data.totalPageIndex);
          //   setDataProducts(res.data.data);
          //   setLoadingType(false);
          // }
        }
      }
    }
    setLoadingIndex(0);
  };

  useEffect(() => {
    fetS();
  }, []);
  useEffect(() => {
    if (caseChose) fetSDataProduct();
  }, [caseChose]);
  const handle = (v: number) => {
    const cases = dataList
      .filter((r) => r.id === v)
      .map((r) => ({ categoryId: r.id, categoryName: r.name }))[0];
    rrr.current = true;
    rrrd.current = true;
    setCaseChose({ ...caseChose, product: cases });
  };

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    rrrd.current = true;
    fetSDataProduct(1, search);
  };
  const [additionalPage, setAdditionalPage] = useState<number>(1);
  const [additionalPageN, setAdditionalPageN] = useState<number>(1);
  const [additionalPageG, setAdditionalPageG] = useState<number>(1);
  let managerIndex = false;
  let isIndex = false;
  let managerIndexN = false;
  let isIndexN = false;
  let managerIndexG = false;
  let isIndexG = false;
  const [loadingIndex, setLoadingIndex] = useState<number>(0);
  return (
    <>
      <div className="w-full  ">
        <SlideHome />

        <div className="w-full h-fit min-[800px]:h-40 bg-[#212322] flex flex-wrap items-center">
          <div
            style={{ fontFamily: '"Mazda robo",sans-serif' }}
            className="w-full flex-wrap h-fit  pt-1 sm:w-[40%] sm:p-3 justify-start max-[600px]:pl-[10%]  flex items-center md:pl-[70px]"
          >
            <p className="text-white w-fit text-[17px] min-[500px]:text-[21px]">
              Các ứng dụng phần mềm{" "}
              <em
                style={{ fontFamily: '"Mazda type",sans-serif' }}
                className="text-[#ceff00] text-[24px]  min-[500px]:text-[30px]"
              >
                hiệu quả
              </em>
            </p>
            <span className="text-[#CEFF00] text-[16px] min-[500px]:text-[20px] m-0 ">
              Liên tục cập nhật phần mềm mới
            </span>
          </div>
          <div className="w-full sm:w-[60%] flex-wrap h-fit flex items-center justify-center">
            {dataSoft.length > 0 ? (
              dataSoft.map((f) => (
                <div
                  key={f.id}
                  className="bg-[#0487b9] text-white hover:bg-[#257bc6] m-2 rounded-md"
                >
                  <a
                    href={f.link}
                    target="_blank"
                    className="w-fit  h-[40px] flex items-center p-[15px] "
                  >
                    <p>{f.name}</p>
                  </a>
                </div>
              ))
            ) : (
              <p className="text-white">Hiện tại chưa có phần mềm nào</p>
            )}
          </div>
        </div>
        <div className=" w-full mb-[100px] flex justify-center">
          <div className="w-full sm:w-[90%] ">
            <div className="w-full mt-2 mb-1">
              <h3 className="w-full pl-1 font-semibold text-lg xl:text-[20px] text-center">
                Danh sách sản phẩm
              </h3>
              <SlideCategory
                loading={loadingType}
                data={dataList}
                onClick={handle}
                active={caseChose.product?.categoryId}
              />
            </div>
            <div className="w-full text-center flex items-center justify-center mb-3 p-2 flex-wrap ">
              <div className="w-full">
                <InputSearch
                  placeholder="Tìm kiếm sản phẩm"
                  onChange={handleSearch}
                  onClick={handleClick}
                  loading={loading}
                />
              </div>
            </div>
            <div>
              <div className="h-[1272px] min-[640px]:h-[1455px] min-[768px]:h-[1690px] min-[1062px]:h-[1267px] min-[1345px]:h-[834px]">
                <div className="w-full flex flex-wrap mt-7 px-1 justify-center ">
                  {!loadingType ? (
                    dataProducts.map((r, index, arr) => (
                      <Link
                        href="/[slug]"
                        as={`product/${r.categoryName
                          ?.replace(/\s+/g, "-")
                          .replace(/&/g, "-and-")}/${r.name
                          .replace(/\s+/g, "-")
                          .replace(/&/g, "-and-")}/${r.id}`}
                        key={r.id}
                        id={index === arr.length - 1 ? "dropdown" : ""}
                        className={`w-[45%] h-fit sm:w-[230px] m-1 sm:m-2 md:w-[300px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px]  cursor-pointer`}
                        onClick={() => setLoadingOpen(r.id + "product")}
                      >
                        <div className="w-full h-[130px] sm:h-[164px] md:h-[215px]">
                          <img
                            src={r.urlImage[0]?.image}
                            alt={r.urlImage[0]?.path}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className={`mt-1 ${styles.containerProductTag}`}>
                          <h3
                            className={`font-bold text-[13px] sm:text-sm md:text-base ${styles.nameTag}`}
                          >
                            {r.name}
                          </h3>
                          <div className="w-full mt-1 md:mt-2 flex items-center border-b border-solid">
                            <p className="text-[11px] sm:text-[13px] md:text-[14px] font-medium text-[crimson]">
                              {r.price
                                .toLocaleString("en-US")
                                .replace(/,/g, ".")}
                            </p>
                            {r.price_After && (
                              <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                                {r.price_After
                                  .toLocaleString("en-US")
                                  .replace(/,/g, ".")}
                              </p>
                            )}
                          </div>
                          <div
                            className={`text-[13px] sm:text-sm md:text-base h-[40px] sm:h-[45px]  mt-2 overflow-hidden ${styles.description}`}
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: r.description,
                            }}
                          ></div>
                        </div>
                        <div className="my-2 flex items-center justify-center relative">
                          <button className="text-[12px] sm:text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 px-3 rounded-md">
                            {loadingOpen === r.id + "product" ? (
                              <div
                                className={`${stylesD.loading} loadingCircle`}
                              >
                                <AiOutlineLoading3Quarters />
                              </div>
                            ) : (
                              " View more"
                            )}
                          </button>
                          <div
                            className="absolute text-[18px] sm:text-[22px] top-[5px] right-[10px] md:right-[40px] text-[crimson]"
                            style={{ color: "crimson !important" }}
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(r.urlShoppe, "_blank");
                            }}
                          >
                            <SiShopee />
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}{" "}
                </div>
              </div>
              <div className="w-full  flex flex-wrap justify-center pb-1 border-b mt-[25px]">
                {loadingIndex === 1 && (
                  <p className="text-[14px] w-full text-center">Loading...</p>
                )}
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
                    if (p > additionalPage * 5 && !isIndex) {
                      isIndex = true;
                      managerIndex = true;
                    } else {
                      managerIndex = false;
                    }
                    return (
                      <div key={p} className="flex w-auto h-fit">
                        {additionalPage > 1 && additionalPage === p && (
                          <div
                            onClick={() => {
                              setAdditionalPage((pre) =>
                                pre - 1 < 1 ? 1 : pre - 1
                              );
                            }}
                            className="flex items-center cursor-pointer text-[22px] px-1 py-[2px]  mr-2 bg-[#22b3bf] text-white"
                          >
                            <MdSkipPrevious />
                          </div>
                        )}
                        {managerIndex && p > additionalPage * 5 ? (
                          <div
                            onClick={() => setAdditionalPage((pre) => pre + 1)}
                            className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                          >
                            <BiSkipNext />
                          </div>
                        ) : (
                          (additionalPage - 1) * (pageIndex - 5) < p &&
                          !isIndex && (
                            <p
                              onClick={() => {
                                if (p !== pageChoice) {
                                  rrrd.current = true;
                                  setLoadingIndex(1);
                                  fetSDataProduct(p);
                                  setPageChoice(p);
                                }
                              }}
                              className={`mx-1 px-[6px] hover:bg-[#d2d5d8] border border-[#2b2b2b]   ${
                                pageChoice === p ? "bg-[#d2d5d8]" : ""
                              } cursor-pointer`}
                            >
                              {p}
                            </p>
                          )
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>{" "}
            <div className="flex mt-3  flex-wrap justify-between overflow-hidden ">
              <div
                className={`w-[49%] flex  flex-wrap justify-around ${styles.news}`}
              >
                <h3
                  className={`text-base w-full font-semibold text-center my-5 ${styles.hh3}`}
                >
                  Tin tức
                </h3>
                <div className="flex flex-wrap justify-around min-[1080px]:h-[678px] h-[1290px]">
                  {dataNews.map((n) => (
                    <Link
                      href={`news/${n.categoryName
                        ?.replace(/\s+/g, "-")
                        .replace(/&/g, "-and-")}/${n.name
                        .replace(/\s+/g, "-")
                        .replace(/&/g, "-and-")}/${n.id}`}
                      key={n.id}
                      onClick={() => setLoadingOpen(n.id + "news")}
                      className="w-[230px] h-fit xl:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer mr-2"
                    >
                      <div className="w-full h-[168px] xl:h-[174px]">
                        <img
                          src={n.urlImage[0]?.image}
                          alt={n.urlImage[0]?.path}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`mt-1 ${styles.containerProductTag}`}>
                        <h3
                          className={`font-bold text-sm h-[40px] ${styles.nameTag} ${styles.nameTagB}`}
                        >
                          {n.name}
                        </h3>
                        <div
                          className={`text-[13px] h-[39px] ${styles.desTag}`}
                          dangerouslySetInnerHTML={{
                            __html:
                              ' <strong style="color: crimson">*</strong>' +
                              n.content,
                          }}
                        ></div>
                      </div>
                      <div className="my-2 flex items-center justify-center relative">
                        <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 px-3 rounded-md">
                          {loadingOpen === n.id + "news" ? (
                            <div className={`${stylesD.loading} loadingCircle`}>
                              <AiOutlineLoading3Quarters />
                            </div>
                          ) : (
                            " View more"
                          )}
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="w-full h-fit flex flex-wrap justify-center pb-1 border-b mt-[25px]">
                  {loadingIndex === 2 && (
                    <p className="text-[14px] w-full text-center">Loading...</p>
                  )}
                  {pageIndexN > 1 &&
                    Array.from(
                      { length: pageIndexN },
                      (_, index) => index + 1
                    ).map((p) => {
                      if (p > additionalPageN * 5 && !isIndexN) {
                        isIndexN = true;
                        managerIndexN = true;
                      } else {
                        managerIndexN = false;
                      }
                      return (
                        <div key={p} className="flex w-auto h-fit">
                          {additionalPageN > 1 && additionalPageN === p && (
                            <div
                              onClick={() => {
                                setAdditionalPageN((pre) =>
                                  pre - 1 < 1 ? 1 : pre - 1
                                );
                              }}
                              className="flex items-center cursor-pointer text-[22px] px-1 py-[2px]  mr-2 bg-[#22b3bf] text-white"
                            >
                              <MdSkipPrevious />
                            </div>
                          )}
                          {managerIndexN && p > additionalPageN * 5 ? (
                            <div
                              onClick={() =>
                                setAdditionalPageN((pre) => pre + 1)
                              }
                              className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                            >
                              <BiSkipNext />
                            </div>
                          ) : (
                            (additionalPageN - 1) * (pageIndexN - 5) < p &&
                            !isIndex && (
                              <p
                                onClick={() => {
                                  if (p !== pageChoiceN) {
                                    rrrd.current = true;
                                    setLoadingIndex(2);
                                    fetSDataNews(p);
                                    setPageChoiceN(p);
                                  }
                                }}
                                className={`mx-1 px-[6px] hover:bg-[#d2d5d8] border border-[#2b2b2b]   ${
                                  pageChoiceN === p ? "bg-[#d2d5d8]" : ""
                                } cursor-pointer`}
                              >
                                {p}
                              </p>
                            )
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>{" "}
              <div
                className={`w-[49%]  flex flex-wrap justify-around ${styles.news}`}
              >
                <h3
                  className={`text-base w-full font-semibold text-center my-5 ${styles.hh4}`}
                >
                  Hướng dẫn
                </h3>
                <div className="flex flex-wrap justify-around min-[1080px]:h-[678px] h-[1290px]">
                  {dataGuid.map((n) => (
                    <Link
                      href={`guide/${n.categoryName
                        ?.replace(/\s+/g, "-")
                        .replace(/&/g, "-and-")}/${n.name
                        .replace(/\s+/g, "-")
                        .replace(/&/g, "-and-")}/${n.id}`}
                      key={n.id}
                      onClick={() => setLoadingOpen(n.id + "guide")}
                      className="w-[230px] h-fit xl:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer mr-2"
                    >
                      <div className="w-full h-[168px] xl:h-[174px]">
                        <img
                          src={n.urlImage[0]?.image}
                          alt={n.urlImage[0]?.path}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`mt-1 ${styles.containerProductTag}`}>
                        <h3
                          className={`font-bold text-sm  h-[40px] ${styles.nameTag}  ${styles.nameTagB}`}
                        >
                          {n.name}
                        </h3>
                        <div
                          className={`text-[13px] h-[39px] ${styles.desTag}`}
                          dangerouslySetInnerHTML={{
                            __html:
                              ` <strong className="text-[crimson]">*</strong>` +
                              n.content,
                          }}
                        ></div>
                      </div>
                      <div className="my-2 flex items-center justify-center relative">
                        <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 px-3 rounded-md">
                          {loadingOpen === n.id + "guide" ? (
                            <div className={`${stylesD.loading} loadingCircle`}>
                              <AiOutlineLoading3Quarters />
                            </div>
                          ) : (
                            " View more"
                          )}
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="w-full h-fit flex flex-wrap justify-center pb-1 border-b mt-[25px]">
                  {loadingIndex === 3 && (
                    <p className="text-[14px] w-full text-center">Loading...</p>
                  )}
                  {pageIndexG > 1 &&
                    Array.from(
                      { length: pageIndexG },
                      (_, index) => index + 1
                    ).map((p) => {
                      if (p > additionalPageG * 5 && !isIndexG) {
                        isIndexG = true;
                        managerIndexG = true;
                      } else {
                        managerIndexG = false;
                      }
                      return (
                        <div key={p} className="flex w-auto h-fit">
                          {additionalPageG > 1 && additionalPageG === p && (
                            <div
                              onClick={() => {
                                setAdditionalPageG((pre) =>
                                  pre - 1 < 1 ? 1 : pre - 1
                                );
                              }}
                              className="flex items-center cursor-pointer text-[22px] px-1 py-[2px]  mr-2 bg-[#22b3bf] text-white"
                            >
                              <MdSkipPrevious />
                            </div>
                          )}
                          {managerIndexG && p > additionalPageG * 5 ? (
                            <div
                              onClick={() =>
                                setAdditionalPageG((pre) => pre + 1)
                              }
                              className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                            >
                              <BiSkipNext />
                            </div>
                          ) : (
                            (additionalPageG - 1) * (pageIndexG - 5) < p &&
                            !isIndexG && (
                              <p
                                onClick={() => {
                                  if (p !== pageChoiceG) {
                                    rrrd.current = true;
                                    setLoadingIndex(3);
                                    fetSDataGuid(p);
                                    setPageChoiceG(p);
                                  }
                                }}
                                className={`mx-1 px-[6px] hover:bg-[#d2d5d8] border border-[#2b2b2b]   ${
                                  pageChoiceG === p ? "bg-[#d2d5d8]" : ""
                                } cursor-pointer`}
                              >
                                {p}
                              </p>
                            )
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
