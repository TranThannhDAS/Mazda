"use client";
import http from "@/utils/http";
import moment from "moment";
import styles from "@/components/styleComponent.module.scss";
import React, { useEffect, useState } from "react";

const page = (props: { params: { detailed: string[] | string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<
    | {
        guide: {
          id: number;
          name: string;
          create_Date: string;
          content: string;
          categoryId: number;
        };
        categoryName: string;
        urlImage: { image: string; path: string }[];
      }
    | undefined
  >();
  useEffect(() => {
    const getProduct = async (detailed: string) => {
      setLoading(true);
      const res = await http.get(`Guide/GetByID/${detailed}`);
      setData(res.data);
      setLoading(false);
    };
    getProduct(props.params.detailed[1]);
  }, []);

  return (
    <div className="w-full min-[1000px]:flex justify-center">
      <div className="w-full min-[1000px]:w-[1000px] relative mt-15 border-t p-5">
        {!loading ? (
          data ? (
            <div>
              <div className="w-[90%] h-[90%]">
                <h3
                  className="text-base md:text-[17px] font-bold"
                  style={{ wordBreak: "break-word" }}
                >
                  {data?.guide.name}{" "}
                </h3>
                <p className="text-sm ">
                  {" "}
                  {moment(data?.guide.create_Date).format(
                    "DD/MM/YYYY HH:MM:SS"
                  )}
                </p>
              </div>
              <div className="min-[1000px]:flex w-full">
                <div
                  className="mt-5 w-full"
                  style={{ wordBreak: "break-word" }}
                >
                  {data && (
                    <div
                      className={`text-xs md:text-[13px] ${styles.dangerouslySet}`}
                      dangerouslySetInnerHTML={{ __html: data?.guide.content }}
                    ></div>
                  )}
                </div>
              </div>
              <div></div>
            </div>
          ) : (
            <p className="m-2 w-full text-center">
              Không tìm thấy bài hướng dẫn
            </p>
          )
        ) : (
          <p className="m-2 w-full text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default page;
