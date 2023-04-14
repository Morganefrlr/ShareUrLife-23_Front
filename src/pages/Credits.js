

const Credits = () => {

    const data = [
        {
            id:1,
            src:"https://img.freepik.com/photos-gratuite/prise-vue-au-grand-angle-seul-arbre-poussant-sous-ciel-assombri-pendant-coucher-soleil-entoure-herbe_181624-22807.jpg?w=2000&t=st=1681388157~exp=1681388757~hmac=5757bb166f7fc0f9abb133bd8ca8e670bf19461cb99d07915fe3732acc7df87a",
            href:"https://fr.freepik.com/photos-gratuite/prise-vue-au-grand-angle-seul-arbre-poussant-sous-ciel-assombri-pendant-coucher-soleil-entoure-herbe_11342065.htm#query=paysage&position=3&from_view=search&track=sph",
            title:"Image de wirestock"
        },
        {
            id:2,
            src:"https://img.freepik.com/photos-gratuite/belle-plage-tropicale-plein-air-mer-autour-ile-samui-cocotier-autres-au-coucher-du-soleil_74190-9034.jpg?w=2000&t=st=1681388231~exp=1681388831~hmac=914c1990e1b22c424153574c1efe0f9f18c4c3a8bafea86891b0098fd6b82a39",
            href:"https://fr.freepik.com/photos-gratuite/belle-plage-tropicale-plein-air-mer-autour-ile-samui-cocotier-autres-au-coucher-du-soleil_5176669.htm?query=paysage",
            title:"IImage de lifeforstock"
        },
        {
            id:3,
            src:"https://img.freepik.com/photos-gratuite/photo-aerienne-route-dans-foret-couverte-arbres-jaunissants-entoures-lac_181624-58374.jpg?w=2000&t=st=1681388281~exp=1681388881~hmac=d0302c9e35b71d9517d2e0e43fb2a3ec0ef2a99e03582b755c13e55a032d8457",
            href:"https://fr.freepik.com/photos-gratuite/photo-aerienne-route-dans-foret-couverte-arbres-jaunissants-entoures-lac_28586328.htm",
            title:"Image de wirestock"
        },
        {
            id:4,
            src:"https://img.freepik.com/photos-gratuite/silhouette-rose-cosmos-fleurs-dans-jardin_1357-51.jpg?w=2000&t=st=1681388816~exp=1681389416~hmac=3ddec5e3fdf97da48526a0551793ccbd9908cb3696d0f3fbdef82c93989003c0",
            href:"https://fr.freepik.com/photos-gratuite/silhouette-rose-cosmos-fleurs-dans-jardin_1131273.htm#query=libre%20droits&position=4&from_view=keyword&track=ais",
            title:"Image de Waewkidja"
        },
        {
            id:5,
            src:"https://img.freepik.com/photos-gratuite/belle-vue-lumiere-du-matin_23-2148851772.jpg?w=2000&t=st=1681388881~exp=1681389481~hmac=216c2566bf52876019ddf557d9d8480418f6f9bd2772ea7aa1c53c2b1187ac5e",
            href:"https://fr.freepik.com/photos-gratuite/belle-vue-lumiere-du-matin_12413435.htm#query=libre%20droits&position=10&from_view=search&track=ais",
            title:"Freepik"
        },
        {
            id:6,
            src:"https://img.freepik.com/photos-gratuite/fleur-herbe-au-coucher-du-soleil_335224-926.jpg?w=2000&t=st=1681389022~exp=1681389622~hmac=2b1d79e41fbb593ef346a3a79a09048d587881ce2bfd9336372f779b380c007c",
            href:"https://fr.freepik.com/photos-gratuite/fleur-herbe-au-coucher-du-soleil_13181282.htm#query=libre%20droits&position=1&from_view=search&track=ais",
            title:"Image de tawatchai07"
        },
        {
            id:7,
            src:"https://img.freepik.com/photos-gratuite/plantes-pendant-coucher-soleil-couper-souffle_181624-8712.jpg?w=2000&t=st=1681389042~exp=1681389642~hmac=9db96a43b793af9ed8dae1ed33dce1ab95d5463268e011ddba31cb9a9428acde",
            href:"https://fr.freepik.com/photos-gratuite/plantes-pendant-coucher-soleil-couper-souffle_9654274.htm#query=soleil%20levant&position=9&from_view=keyword&track=ais",
            title:"Image de wirestock"
        },
        {
            id:8,
            src:"https://img.freepik.com/photos-gratuite/coucher-soleil-coucher-soleil-pre-soiree-beaute-naturelle_1421-276.jpg?w=2000&t=st=1681389252~exp=1681389852~hmac=72b7b809e61c2425bd8e41ce91920a2dd627302553532009041ccd8257e5a8c3",
            href:"https://fr.freepik.com/photos-gratuite/coucher-soleil-coucher-soleil-pre-soiree-beaute-naturelle_1235260.htm#query=soleil%20levant&position=0&from_view=keyword&track=ais",
            title:"Image de ijeab"
        },
        {
            id:9,
            src:"https://img.freepik.com/photos-gratuite/fermez-herbe-coucher-soleil-lac-arriere-plan_1353-306.jpg?w=2000&t=st=1681389267~exp=1681389867~hmac=0d16a1f842beac01994d520b2acb0354904e8fcea8fe925af9a4ff18912d75c6",
            href:"https://fr.freepik.com/photos-gratuite/fermez-herbe-coucher-soleil-lac-arriere-plan_1286217.htm#query=soleil%20levant&position=22&from_view=keyword&track=ais",
            title:"Image de jeswin"
        },
        {
            id:10,
            src:"https://img.freepik.com/photos-gratuite/plan-vertical-silhouette-homme-devant-camera_181624-24735.jpg?w=1480&t=st=1681389281~exp=1681389881~hmac=e447c3cead5e0888d924ebc2fd1527acec4d56508cc98450798d3d1838a31093",
            href:"https://fr.freepik.com/photos-gratuite/plan-vertical-silhouette-homme-devant-camera_11541691.htm#page=2&query=photographe%20paysage&position=3&from_view=search&track=ais",
            title:"Image de wirestock"
        },
        {
            id:11,
            src:"https://img.freepik.com/photos-gratuite/tir-vertical-homme-marchant-autoroute-couverte-brouillard_181624-15515.jpg?w=1800&t=st=1681389296~exp=1681389896~hmac=428453969851ded8d0305a112d043c846a486509b9318632d9d7267bb158fb6f",
            href:"https://fr.freepik.com/photos-gratuite/tir-vertical-homme-marchant-autoroute-couverte-brouillard_10303712.htm",
            title:"Image de wirestock"
        },
        {
            id:12,
            src:"https://img.freepik.com/free-vector/abstract-hand-drawn-woman-portrait_23-2148879176.jpg?w=2000&t=st=1681389392~exp=1681389992~hmac=3e85d731633e8e1bbbdbdbc83df9ad6409b076d08db025bd6dc88b65ffaf2538",
            href:"https://www.freepik.com/free-vector/abstract-hand-drawn-woman-portrait_12978838.htm#query=portrait%20femme&position=9&from_view=search&track=ais",
            title:"Freepik"
        },
        {
            id:13,
            src:"https://img.freepik.com/photos-gratuite/coup-moyen-belle-femme-posant-exterieur_23-2149523777.jpg?w=1380&t=st=1681389408~exp=1681390008~hmac=0c10c6e6e88a71eb521407a81a2343664a71064a4d8b001b5f8faaba45cb1b06",
            href:"https://fr.freepik.com/photos-gratuite/coup-moyen-belle-femme-posant-exterieur_29302317.htm#query=portrait%20soleil&position=37&from_view=search&track=ais",
            title:"Freepik"
        },
        {
            id:14,
            src:"https://img.freepik.com/photos-gratuite/jeune-photographe-concentre-prend-photo-fond-grunge-sombre_613910-12960.jpg?w=2000&t=st=1681389420~exp=1681390020~hmac=bd0bd7169deced7697a9688db4159ecc33de5969b6d1c1201f57fe540997b925",
            href:"https://fr.freepik.com/photos-gratuite/jeune-photographe-concentre-prend-photo-fond-grunge-sombre_26389456.htm#query=portrait%20photographe&position=3&from_view=search&track=ais",
            title:"Image de fxquadro"
        },
        {
            id:15,
            src:"https://img.freepik.com/photos-gratuite/smiley-homme-detente-exterieur_23-2148739334.jpg?w=1380&t=st=1681454144~exp=1681454744~hmac=3cf524dce7c54dc8910c55d83b9aa5feefd63457319054984ba99d7f10aebe27",
            href:"https://fr.freepik.com/photos-gratuite/smiley-homme-detente-exterieur_10891054.htm#query=portrait&position=28&from_view=search&track=sph",
            title:"Freepik"
        },
        {
            id:16,
            src:"https://img.freepik.com/photos-gratuite/femme-pensive-aux-cheveux-brillants-assis-chaise-rouge-souriant_197531-6529.jpg?w=2000&t=st=1681454159~exp=1681454759~hmac=86d70d4d022698ec91e0ba3780b90f6c741287043f9d7d814a0a14190cd2fcd8",
            href:"https://fr.freepik.com/photos-gratuite/femme-pensive-aux-cheveux-brillants-assis-chaise-rouge-souriant_10906394.htm#query=portrait&position=14&from_view=search&track=sph",
            title:"Image de lookstudio"
        },
        {
            id:17,
            src:"https://img.freepik.com/photos-gratuite/bouchent-portrait-jeune-homme-isole-fond-noir-studio_155003-23972.jpg?w=2000&t=st=1681454178~exp=1681454778~hmac=d8f948b2402b9fe54543f39851224ac403ca40696c6d6deffd628cc5e0080134",
            href:"https://fr.freepik.com/photos-gratuite/bouchent-portrait-jeune-homme-isole-fond-noir-studio_11689642.htm#query=portrait&position=39&from_view=search&track=sph",
            title:"Image de master1305"
        },
    ]
    return (
        <div className="credits">
            {data.map(item => 
                <div className="item" key={item.id}>
                    <img className="item_img" src={item.src} alt="" />
                    <a className="item_lien" href={item.href}>{item.title}</a>
                </div>
            )}

        </div>
    );
};

export default Credits;