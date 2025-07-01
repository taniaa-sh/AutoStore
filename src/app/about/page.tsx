'use client';

import Image from "next/image";

function AboutPage() {

    return (
        <main className="w-full mx-auto p-6">

            {/*Header*/}
            <div className="mt-20 w-full">
                <div className="relative h-[400px] w-full">
                    <Image
                        src={"/aboutHeader.webp"}
                        alt="about"
                        layout="fill"
                        objectFit="cover"
                        className="object- z-0"
                    />
                    <div className="absolute inset-0 bg-black/60 z-10 flex items-center pl-20">
                        <div>
                            <p className="text-white text-5xl font-bold">There’s a lot to love</p>
                            <p className="text-white text-5xl font-bold">about CarMax</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*Our purpose*/}
            <div className="mt-10 px-[200px] text-center">
                <h2 className="text-3xl font-bold text-gray-600">Our purpose</h2>
                <div className="mt-12 flex flex-col">
                    <h2 className="text-4xl font-bold text-gray-700">To drive integrity by being honest</h2>
                    <h2 className="text-4xl font-bold text-gray-700">transparent in every interaction.</h2>
                </div>
                <h2 className="text-4xl font-bold text-gray-700 mt-11">Who we are</h2>
                <div className="mt-10 flex gap-8">
                    <p className="text-justify text-gray-500 leading-5">
                        At CarMax, our commitment to innovation and iconic customer experiences have made us the nations largest retailer of used cars. As the original disruptor of the automotive industry, our “no-haggle” prices transformed car buying and selling from a stressful, dreaded event into the honest, straightforward experience all people deserve. Weve been raising the bar on customer experiences ever since.
                    </p>
                    <p className="text-justify text-gray-500 leading-5">
                        Today, our customers have the ability to buy completely on their terms, whether thats online, in the store, or using a seamless combination of both. And as we move into the future, we stay committed to transparency, to creating offerings that put you in control, and delivering iconic car buying experiences unlike any youve seen before.
                    </p>
                </div>
                <div className="flex gap-20 items-center justify-center mt-10">
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src={"/purpose1.svg"}
                            alt="about"
                            width={70}
                            height={70}
                            className="object-contain"
                        />
                        <div className="flex flex-col">
                            <p className="text-gray-500">24-hour test</p>
                            <p className="text-gray-500">drives</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src={"/pupose2.svg"}
                            alt="about"
                            width={70}
                            height={70}
                            className="object-contain"
                        />
                        <div className="flex flex-col">
                            <p className="text-gray-500">Home</p>
                            <p className="text-gray-500">delivery†</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src={"/purpose3.svg"}
                            alt="about"
                            width={90}
                            height={79}
                            className="object-contain"
                        />
                        <div className="flex flex-col">
                            <p className="text-gray-500">Express</p>
                            <p className="text-gray-500">pickup</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*What matters to us*/}
            <div className="bg-blue-50 mt-10 pb-10">
                <div className="mt-10 px-[200px] text-center">
                    <h2 className="text-3xl font-bold text-gray-600 py-10">What matters to us</h2>
                    <div className="bg-blue-600 rounded-lg p-10 flex gap-20 text-white items-center justify-center">
                        <div className="flex flex-col font-bold">
                            <p className="text-3xl">Above all, we care</p>
                            <p className="text-3xl">about people.</p>
                        </div>
                        <span className="w-px h-40 bg-white" />
                        <div className="flex flex-col gap-6">
                            <p className="text-3xl font-bold">Our core values</p>
                            <ol>
                                <li className="text-xl leading-8 text-justify font-semibold">Do the right thing</li>
                                <li className="text-xl leading-8 text-justify font-semibold">Put people first</li>
                                <li className="text-xl leading-8 text-justify font-semibold">Win together</li>
                                <li className="text-xl leading-8 text-justify font-semibold">Go for greatness</li>
                            </ol>
                        </div>
                    </div>
                    <div className="mt-12 flex gap-10">
                        <Image
                            src={"/importance1.jpg"}
                            alt=""
                            width={700}
                            height={500}
                            className="rounded-xl"
                        />
                        <div className="flex flex-col  gap-2">
                            <div className="flex gap-2 items-center">
                                <span className="w-10 h-3 bg-blue-600" />
                                <p>Our associates</p>
                            </div>
                            <p className="text-justify text-gray-500 leading-5 text-sm">
                                Our success is possible because of the hard work and dedication of our 30,000+ associates nationwide. If you join our team, youll join a culture of transparency, integrity, and an unwavering focus on doing whats right for each other, our customers, and our communities. Were committed to helping you innovate, learn, grow, and shape your career in ways you havent even imagined.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 flex gap-10">
                        <div className="flex flex-col  gap-2">
                            <div className="flex gap-2 items-center">
                                <span className="w-10 h-3 bg-blue-600" />
                                <p>Our associates</p>
                            </div>
                            <p className="text-justify text-gray-500 leading-5 text-sm">
                                Our success is possible because of the hard work and dedication of our 30,000+ associates nationwide. If you join our team, youll join a culture of transparency, integrity, and an unwavering focus on doing whats right for each other, our customers, and our communities. Were committed to helping you innovate, learn, grow, and shape your career in ways you havent even imagined.
                            </p>
                        </div>
                        <Image
                            src={"/importance2.jpg"}
                            alt=""
                            width={700}
                            height={500}
                            className="rounded-xl"
                        />
                    </div>
                    <div className="mt-12 flex gap-10">
                        <Image
                            src={"/importance3.jpg"}
                            alt=""
                            width={700}
                            height={500}
                            className="rounded-xl"
                        />
                        <div className="flex flex-col  gap-2">
                            <div className="flex gap-2 items-center">
                                <span className="w-10 h-3 bg-blue-600" />
                                <p>Our associates</p>
                            </div>
                            <p className="text-justify text-gray-500 leading-5 text-sm">
                                Our success is possible because of the hard work and dedication of our 30,000+ associates nationwide. If you join our team, youll join a culture of transparency, integrity, and an unwavering focus on doing whats right for each other, our customers, and our communities. Were committed to helping you innovate, learn, grow, and shape your career in ways you havent even imagined.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 flex gap-10">
                        <div className="flex flex-col  gap-2">
                            <div className="flex gap-2 items-center">
                                <span className="w-10 h-3 bg-blue-600" />
                                <p>Our associates</p>
                            </div>
                            <p className="text-justify text-gray-500 leading-5 text-sm">
                                Our success is possible because of the hard work and dedication of our 30,000+ associates nationwide. If you join our team, youll join a culture of transparency, integrity, and an unwavering focus on doing whats right for each other, our customers, and our communities. Were committed to helping you innovate, learn, grow, and shape your career in ways you havent even imagined.
                            </p>
                        </div>
                        <Image
                            src={"/importance4.jpg"}
                            alt=""
                            width={700}
                            height={500}
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AboutPage;
