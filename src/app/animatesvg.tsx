"use client";

import { useState } from "react";
import { Button as ShadButton } from "~/components/shadcn/button";
import { Gift, Sparkles, Zap, Heart } from "lucide-react";
import Link from "next/link";
import LinkButton from "~/ui/buttons/link-button";
import Button from "~/ui/buttons";
import { MovingButton } from "~/components/aceternity/moving-border-button";
import { Vortex } from "~/components/aceternity/vortex";
import { Boxes } from "~/components/aceternity/background-boxes";

export default function DigitalGiftHero() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section dir="rtl" className="h-screen overflow-hidden text-primary">
      {" "}
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {" "}
        <Vortex
          particleCount={20}
          rangeY={1080}
          className="relative flex flex-col items-center justify-center gap-10"
        >
          {" "}
          <div className="z-10 flex flex-col items-center justify-center space-y-8 text-center backdrop-blur-md lg:text-left">
            <h1 className="flex gap-3 text-center text-4xl font-bold tracking-tighter text-accent sm:text-5xl xl:text-6xl/none">
              <span>دیکادو</span>{" "}
              <span className="text-yellow-300">یک سوپرایز دیجیتال</span>
            </h1>
            <p
              dir="rtl"
              className="mx-auto max-w-[600px] text-justify text-lg text-primary sm:text-xl"
            >
              دیکادو یک راه‌حل نوآورانه برای هدیه دادن سریع و لحظه‌ای است که از
              طریق لینک ایجاد شده در پلتفرم و ارسال آن به دریافت‌کننده، تجربه‌ای
              بی‌نظیر از هدیه دادن را فراهم می‌کند. با دیکادو می‌توانید اعتبار
              خرید از برندهای مختلف را بدون نیاز به کارت‌های فیزیکی به عنوان
              هدیه ارسال کنید. این پلتفرم مناسب افرادی است که می‌خواهند در
              کمترین زمان ممکن و به سادگی، هدیه‌ای کاربردی و ارزشمند را به
              عزیزان خود تقدیم کنند.
            </p>
            <div className="flex w-full items-center justify-center gap-5 py-5">
              <MovingButton
                borderRadius="1.75rem"
                className="flex items-center justify-center gap-2 border border-white/0 bg-secondary px-5 py-3 text-sm text-primary hover:bg-secbuttn"
              >
                {" "}
                <Gift className="h-5 w-5" />
                کادو بفرست
              </MovingButton>
              <Link className="flex w-auto" href={"/brands"} prefetch>
                <Button className="w-auto rounded-[1.75rem] border border-accent border-primary/80 bg-transparent px-10 py-4 text-primary hover:bg-white/20">
                  برند ها
                </Button>
              </Link>
            </div>
          </div>
          <div
            className="absolute top-60 z-0 mx-auto max-w-[500px]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-cyan-500/30 blur-3xl"></div>
            <svg
              viewBox="-100 -200 700 700"
              className="relative z-10 h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="circuit"
                  x="0"
                  y="0"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 25h50M25 0v50M12.5 12.5h25v25h-25z"
                    stroke="#A5B4FC"
                    strokeWidth="0.5"
                  />
                </pattern>
                <linearGradient
                  id="paint0_linear"
                  x1="250"
                  y1="10"
                  x2="250"
                  y2="490"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#C084FC" />
                  <stop offset="1" stopColor="#60A5FA" />
                </linearGradient>
              </defs>

              <circle cx="250" cy="250" r="240" fill="url(#circuit)" />
              <path
                d="M250 10C383.594 10 490 116.406 490 250C490 383.594 383.594 490 250 490C116.406 490 10 383.594 10 250C10 116.406 116.406 10 250 10Z"
                stroke="url(#paint0_linear)"
                strokeWidth="20"
              />

              <g
                className={`transition-transform duration-300 ${isHovering ? "scale-105" : ""}`}
              >
                <rect
                  x="150"
                  y="150"
                  width="200"
                  height="200"
                  rx="20"
                  fill="#F0ABFC"
                  className="animate-pulse"
                />
                <rect
                  x="180"
                  y="180"
                  width="140"
                  height="140"
                  rx="15"
                  fill="#818CF8"
                  className="animate-bounce"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="50"
                  fill="#FDE68A"
                  className="animate-spin"
                  style={{ animationDuration: "10s" }}
                />
              </g>

              <path
                d="M50 250h400"
                stroke="#E0E7FF"
                strokeWidth="2"
                strokeDasharray="10 5"
              />
              <path
                d="M250 50v400"
                stroke="#E0E7FF"
                strokeWidth="2"
                strokeDasharray="10 5"
              />

              <g className="animate-bounce" style={{ animationDuration: "2s" }}>
                <Sparkles x="50" y="50" className="h-12 w-12 text-yellow-300" />
              </g>
              <g
                className="animate-bounce"
                style={{ animationDuration: "2.5s" }}
              >
                <Sparkles x="400" y="400" className="h-12 w-12 text-pink-300" />
              </g>
              <g className="animate-pulse">
                <Zap x="400" y="100" className="h-10 w-10 text-blue-300" />
              </g>
              <g
                className={`transition-transform duration-300 ${isHovering ? "scale-125" : ""}`}
              >
                <Heart x="100" y="400" className="h-10 w-10 text-red-400" />
              </g>

              <text
                x="250"
                y="495"
                textAnchor="middle"
                className="fill-current text-xs text-indigo-200"
              >
                Digital Gifts
              </text>
            </svg>
          </div>
        </Vortex>
      </div>
    </section>
  );
}
