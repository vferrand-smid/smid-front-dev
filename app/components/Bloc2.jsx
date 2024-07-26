import Image from "next/image";

const Bloc2 = ({ page }) => {
    return(
    <div className="container">
        {page?.pageDAccueilBloc2?.repeteur1?.map((item, index) => (
            <div className="repeteur_bloc2" key={index}>
                <div className="repeteur_bloc2_img_container">
                    <Image
                        className="repeteur_bloc2_img"
                        priority
                        width={100}
                        height={100}
                         src={item.img_repeteur1.node.mediaItemUrl} alt=""/>
                </div>
                <div className="repeteur_bloc2_text">
                    <h4 className="">{item.titre_repeteur1}</h4>
                </div>
                {index < page.pageDAccueilBloc2.repeteur1.length - 1 &&
                    <div className="separator"></div>}
            </div>
        ))}
    </div>
    )
}
export default Bloc2;
