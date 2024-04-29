import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';
import { accordion_data } from "./Accordion.jsx";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Value = () => {
    return (
        <section className="v-wrapper">
            <div className="flex flex-wrap justify-center items-center gap-y-8 p-6 innerWidth max-lg:flex-col v-container">
                {/* left side */}
                <div className="flex-1 v-left">
                    <div className="w-[30rem] h-[35rem] overflow-hidden rounded-t-full border-8 border-solid border-white border-opacity-10 max-lg:w-[95%] max-lg:h-[30rem] max-md:w-[95%] max-md:h-[25rem] image-container">
                        <img src="https://res.cloudinary.com/sarvesh-damle/image/upload/v1710600461/Buddies_MajorProject/logos/value_wxoevo.png" alt="about_image" className="w-[100%] h-[100%]" />
                    </div>
                </div>

                {/* right side */}
                <div className="flexColStart flex-1 gap-2 v-right">
                    <span className="orangeText">Our Value</span>
                    <span className="primaryText max-sm:text-3xl">Value We Give to You</span>
                    <span className="secondaryText">We are always ready to help by providing the best services for our customers <br /> We believe in convenience and getting you a good place to live</span>

                    <Accordion className="mt-8 border-none" allowMultipleExpanded={false} preExpanded={[0]}>
                        {accordion_data.map((item, index) => {
                            return (
                                <AccordionItem className="bg-white border border-gray-400 border-opacity-25 rounded-lg overflow-hidden mb-5 accordionItem shadow-lg" key={index} uuid={index}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton className="bg-white flex flex-wrap justify-between items-center gap-y-8 p-4 w-[100%] cursor-pointer accordionButton"
                                        >
                                            <div className="flexCenter p-2 bg-[#eeeeff] rounded text-blue icon">{item.icon}</div>
                                            <span className="text-base primaryText max-sm:text-2xl">{item.heading}</span>
                                            <div className="flexCenter p-2 bg-[#eeeeff] rounded text-blue icon">
                                                <MdOutlineArrowDropDown size={20} />
                                            </div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p className="secondaryText">{item.detail}</p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export default Value