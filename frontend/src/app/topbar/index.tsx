import React from 'react';
import Link from "next/link";
import SearchBoxContainer from "./search";
import AuthButtons from "./auth";

const Topbar = () => {

    return (
        <div style={{ zIndex: 9000 }} className="flex sticky top-0 flex-wrap bg-blue-800 px-4 py-2 drop-shadow-md text-white">
            <div className="w-1/2 flex items-center">
                <div className="w-1/3 text-2xl mr-4">
                    <Link href="/" passHref>
                        <a>
                            WQIApp
                        </a>
                    </Link>
                </div>
                <div className="w-2/3">
                    <SearchBoxContainer />
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-end">
                <div className="w-3/4 flex justify-center px-2">
                    <div className="flex gap-3 text-lg">
                        <Link href="/calculate-wqi" passHref>
                            <a className="text-white">
                                WQI Calculator
                            </a>
                        </Link>
                        <Link href="/rankings" passHref>
                            <a className="text-white">
                                Methodology
                            </a>
                        </Link>
                        <Link href="/stats" passHref>
                            <a className="text-white">
                                Statistics
                            </a>
                        </Link>
                        <Link href="/rankings" passHref>
                            <a className="text-white">
                                Contribute
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="w-1/4 px-2">
                    <AuthButtons />
                </div>
            </div>
        </div>
    );

};

export default Topbar;

