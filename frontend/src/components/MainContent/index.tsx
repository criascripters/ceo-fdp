import MessagesProvider from "@/contexts/MessagesProvider";
import Header from "../Header";
import MainForm from "../MainForm";
import PastMessagesList from "../PastMessagesList";

export default function MainContent() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-1 overflow-auto
            max-w-[1000px] px-2 py-1
        ">
            <MessagesProvider>
                <PastMessagesList />
                <div className="flex flex-col gap-2 sm:gap-4 items-center self-start sm:flex-2 sm:h-full">
                    <Header />
                    <MainForm />
                </div>
            </MessagesProvider>
        </div>
    )
}