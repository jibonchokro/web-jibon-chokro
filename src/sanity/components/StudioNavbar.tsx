"use client";

import type { NavbarProps } from "sanity";

function DashboardIcon() {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 21V13H15V21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function StudioNavbar(props: NavbarProps) {
    return (
        <div
            style={{
                position: "relative",
                paddingRight: 32,
            }}
        >
            {props.renderDefault(props)}

            <a
                href="/dashboard"
                aria-label="ড্যাশবোর্ড"
                style={{
                    position: "absolute",
                    top: "34px",
                    right: 12,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    width: 32,
                    height: 32,
                    transform: "translateY(-50%)",
                    color: "var(--card-fg-color)",
                    borderBottom: "1px solid #ddd",
                    marginRight: "-12px",
                    paddingRight: "12px",
                }}
            >
                <DashboardIcon />
            </a>
        </div>
    );
}