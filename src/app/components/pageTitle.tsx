import Link from "next/link";

interface Props {
    title?: string;
    href?: string;
    linkCaption?: string;
}

const PageTitle = (props: Props) => {
    return (
        <div className="p-3 ml-3 mr-3 mb-5 bg-white flex justify-between border-b-1 border-b-slate-700 ">
            <h1 className="text-slate-700 text-xl font-medium tracking-wider">{props.title}</h1>
            {props.href!! &&
                <Link className="text-slate-700 hover:text-slate-800 transition-colors"
                      href={props.href}>{props.linkCaption}</Link>}
        </div>
    );
};

export default PageTitle;