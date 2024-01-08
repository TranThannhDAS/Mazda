"use client";
import moment from "moment";
import Link from "next/link";
import React from "react";
import styles from "@/app/styleHomePage.module.scss";
import stylesD from "../../components/Items/styleItems.module.scss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const News: React.FC<{
  n: {
    id: number;
    name: string;
    categoryName: string;
    create_Date: string;
    content: string;
    urlImage: {
      image: string;
      path: string;
    }[];
  };
  cate: string;
  loadingOpen: number | null;
  setLoadingOpen: React.Dispatch<React.SetStateAction<number | null>>;
}> = ({ n, cate, loadingOpen, setLoadingOpen }) => {
  return (
    <Link
      key={n.id}
      href={`/[slug]`}
      as={`${n.categoryName
        ?.replace(/\s+/g, "-")
        .replace(/&/g, "-and-")}/${n.name
        .replace(/\s+/g, "-")
        .replace(/&/g, "-and-")}/${n.id}`}
      onClick={() => setLoadingOpen(n.id)}
      className="w-full flex flex-wrap min-[420px]:flex-nowrap mb-6"
    >
      <div className="min-w-full h-[130px] min-[420px]:min-w-[250px] md:h-[170px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
        <img
          src={n.urlImage[0]?.image}
          alt={n.urlImage[0]?.path}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-fit">
        <h3
          className="text-base md:text-[17px] font-bold overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-word",
          }}
        >
          {n.name}
        </h3>
        <p className="text-xs mt-1">
          {moment(n.create_Date).format("DD/MM/YYYY HH:MM:SS")}
        </p>
        <div
          className={`text-sm md:text-base  mt-2 overflow-hidden ${styles.description}`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={{ __html: n.content }}
        ></div>
        {loadingOpen === n.id && (
          <div className="w-fit">
            <div className={`${stylesD.loading} loadingCircle`}>
              <AiOutlineLoading3Quarters />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default News;
