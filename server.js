const Express = require("express");
const xmlParser = require("xml2js-parser").parseStringSync;
const bodyParser = require("body-parser");
const xml2js = require("xml2js");
const fs = require("fs");
const fs_extra = require("fs-extra");
const Path = require("path");
const fileUpload = require("express-fileupload");
const svgson = require("svgson");
const SVGO = require("svgo");
const MongoClient = require("mongodb").MongoClient;

const app = Express();
const builder = new xml2js.Builder();
const parser = new xml2js.Parser({ explicitArray: false });
const jsonParser = bodyParser.json();
const svgo = new SVGO({
    plugins: [{
        cleanupAttrs: true,
    }, {
        removeDoctype: true,
    }, {
        removeXMLProcInst: true,
    }, {
        removeComments: true,
    }, {
        removeMetadata: true,
    }, {
        removeTitle: true,
    }, {
        removeDesc: true,
    }, {
        removeUselessDefs: true,
    }, {
        removeEditorsNSData: true,
    }, {
        removeEmptyAttrs: true,
    }, {
        removeHiddenElems: true,
    }, {
        removeEmptyText: true,
    }, {
        removeEmptyContainers: true,
    }, {
        removeViewBox: false,
    }, {
        cleanUpEnableBackground: true,
    }, {
        convertStyleToAttrs: true,
    }, {
        convertColors: true,
    }, {
        convertPathData: true,
    }, {
        convertTransform: true,
    }, {
        removeUnknownsAndDefaults: true,
    }, {
        removeNonInheritableGroupAttrs: true,
    }, {
        removeUselessStrokeAndFill: true,
    }, {
        removeUnusedNS: true,
    }, {
        cleanupIDs: true,
    }, {
        cleanupNumericValues: true,
    }, {
        moveElemsAttrsToGroup: true,
    }, {
        moveGroupAttrsToElems: true,
    }, {
        collapseGroups: true,
    }, {
        removeRasterImages: false,
    }, {
        mergePaths: true,
    }, {
        convertShapeToPath: true,
    }, {
        sortAttrs: true,
    }, {
        transformsWithOnePath: false,
    }, {
        removeDimensions: false,
    }, {
        removeAttrs: false,
    }]
});

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

let dbClient;

app.use(fileUpload());
app.use(Express.static(__dirname + "/public"));
app.use('/styles', Express.static(Path.join(__dirname, '/public/styles')));
app.use('/js', Express.static(Path.join(__dirname, '/public/js')));

/////UPLOAD SVG!!!\\\\\

app.post(
    "/api/upload",
    (req, res) => {

        let svgFile = req.files.file;
        const svgOnServer = Path.join(__dirname, 'public', 'figures', req.files.file.name);
        svgFile.mv(svgOnServer, (err) => {
            if (err)
                return res.status(500).send(err);
            const data = fs.readFileSync(svgOnServer, "utf8");
            svgo.optimize(data, { path: svgOnServer }).then(result => {
                svgson(result.data, {}, result => res.send({...result, childs: result.childs[0] }));
            });
        });
    });

/////UPLOAD FILE!!!\\\\\

app.post(
    "/api/uploadfile",
    (req, res) => {

        let expFile = req.files.file;
        const expOnServer = Path.join(__dirname, 'library', 'experiments', req.files.file.name);
        expFile.mv(expOnServer, (err) => {
            if (err)
                return res.status(500).send(err);
            const data = fs.readFileSync(expOnServer, "utf8");
            parser.parseString(data, (err, result) => {
                res.send(result);
            });
        });
    });

/////CREATE EXPERIMENT!!!\\\\\

app.get(
    "/api/attributes",
    (req, res) => {

        const xmlFile = Path.join(__dirname, 'library', 'attributes.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        parser.parseString(data, (err, result) => {
            res.send(result.features.featureitem);
        });
    });

app.get(
    "/api/concepts",
    (req, res) => {

        const xmlFile = Path.join(__dirname, 'library', 'concepts.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        parser.parseString(data, (err, result) => {
            res.send(result.concepts.conceptitem);
        });
    });

/////MONGODB!!!\\\\\

app.post(
    "/api/initexp",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const collection = app.locals.db.collection(exp_name);
        const options = {
            "sort": [
                ['test_id', -1]
            ]
        };
        collection.findOne({}, options, (err, doc) => {

            let action = {};

            if (doc === null) {

                action = { test_id: 0, action: "Старт эксперимента", time: new Date().toISOString() };
            } else {

                action = { test_id: doc.test_id + 1, action: "Старт эксперимента", time: new Date().toISOString() };
            }
            collection.insertOne(action, (err, result) => {

                if (err) return console.log(err);

                res.send(action);
            });
        });
    });

app.post(
    "/api/endexperiment",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const end_type = req.body.end_type;
        const collection = app.locals.db.collection(exp_name);

        let action = {};

        if (end_type === 0) {

            action = { test_id: test_id, action: "Конец эксперимента: фигуры не найдены", time: new Date().toISOString() };
        } else {

            action = { test_id: test_id, action: "Конец эксперимента: фигуры найдены", time: new Date().toISOString() };
        }
        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/dragfigfield",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const fig_name = req.body.fig_name;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Взять фигуру с поля", figure: fig_name, time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/dropfigfield",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const fig_name = req.body.fig_name;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Вернуть фигуру на поле", figure: fig_name, time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/dragfiguserlist",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const fig_name = req.body.fig_name;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Взять выставленную фигуру", figure: fig_name, time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/dropfiguserlist",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const fig_name = req.body.fig_name;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Выставить фигуру рядом с образцом", figure: fig_name, time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/okactionshape",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const fig_name = req.body.fig_name;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Выставить фигуру рядом с образцом", figure: fig_name, time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/cancleactionshape",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const fig_name = req.body.fig_name;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Вернуть фигуру на поле", figure: fig_name, time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/rotateactionshape",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const fig_name = req.body.fig_name;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Повернуть фигуру", figure: fig_name, time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/fliphactionshape",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const fig_name = req.body.fig_name;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Отразить фигуру по горизонтали", figure: fig_name, time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/flipvactionshape",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const fig_name = req.body.fig_name;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Отразить фигуру по вертикали", figure: fig_name, time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/dropfigactionblock",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const fig_name = req.body.fig_name;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Выставить фигуру в функциональный блок", figure: fig_name, time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/endselection",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Завершить выставление фигур", time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/okselection",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Подтвердить выставку", time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/cancleselection",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Отменить выставку", time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/canclehypothesis",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Отменить ввод гипотезы", time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

app.post(
    "/api/opennextsample",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const exp_name = req.body.exp_name;
        const test_id = req.body.test_id;
        const hyp_name = req.body.hypothesis;
        const collection = app.locals.db.collection(exp_name);

        const action = { test_id: test_id, action: "Ввести гипотезу", hypothesis: hyp_name, time: new Date().toISOString() };

        collection.insertOne(action, (err, result) => {

            if (err) return console.log(err);

            res.send(action);
        });
    });

/////EARLY EXPERIMENTS!!!\\\\\

app.get(
    "/api/all",
    (req, res) => {

        const dirPath = Path.join(__dirname, 'library', 'experiments');
        const expList = fs.readdirSync(dirPath, "utf8");
        res.send(expList);
    });

app.get(
    "/api/early",
    (req, res) => {

        const dirPath = Path.join(__dirname, 'library', 'experiments');
        const expList = fs.readdirSync(dirPath, "utf8");
        let earlyList = [];
        for (let i = 0; i < expList.length; ++i) {
            let exp = dirPath + '/' + expList[i];
            const stats = fs.statSync(exp);
            const createDate = new Date(stats["mtime"]);
            const nowDate = new Date();
            if (createDate.getFullYear() === nowDate.getFullYear()) {
                if (createDate.getMonth() === nowDate.getMonth()) {
                    if ((nowDate.getDate() - createDate.getDate()) < 10) {
                        earlyList.push(expList[i]);
                    }
                } else if (createDate.getMonth() < nowDate.getMonth()) {
                    if (nowDate.getDate() <= 3 && createDate.getDate() >= 26) {
                        earlyList.push(expList[i]);
                    }
                }
            } else if (createDate.getFullYear() < nowDate.getFullYear()) {
                if (createDate.getMonth() === 11 && nowDate.getMonth() === 0) {
                    if (nowDate.getDate() <= 3 && createDate.getDate() >= 26) {
                        earlyList.push(expList[i]);
                    }
                }
            }
        }
        res.send(earlyList);
    });

/////OPEN EXPERIMENT!!!\\\\\

app.post(
    "/api/open",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const filename = req.body.filename;
        const filePath = Path.join(__dirname, 'library', 'experiments', filename);
        const data = fs.readFileSync(filePath, "utf8");
        parser.parseString(data, (err, result) => {
            res.send(result);
        });
    });

/////SAVE EXPERIMENT!!!\\\\\

app.post(
    "/api/save",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const expinfo = req.body.save_exp_info;
        const xmlFile = Path.join(__dirname, 'library', 'experiments', req.body.save_name);
        const xml = builder.buildObject(expinfo);
        fs.writeFileSync(xmlFile, xml);
        res.send(expinfo);
    });

/////SAVE AS EXPERIMENT!!!\\\\\

app.post(
    "/api/saveas",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const expinfo = req.body.exp_info;
        const xmlFile = Path.join(__dirname, 'library', 'experiments', req.body.file_name);
        const xml = builder.buildObject(expinfo);
        fs.writeFileSync(xmlFile, xml);
        res.send(expinfo);
    });

/////RENAME EXPERIMENT!!!\\\\\

app.post(
    "/api/exprename",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const oldName = Path.join(__dirname, 'library', 'experiments', req.body.oldexpname);
        const newName = Path.join(__dirname, 'library', 'experiments', req.body.newexpname);

        fs.rename(oldName, newName, (err) => {
            if (err) console.log('ERROR: ' + err);
            res.send({ newExpName: req.body.newexpname });
        });
    });

/////COPY EXPERIMENT!!!\\\\\

app.post(
    "/api/expcopy",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const expName = Path.join(__dirname, 'library', 'experiments', req.body.expname + '.xml');
        const expCopy = Path.join(__dirname, 'library', 'experiments', req.body.expname + '_copy.xml');

        fs_extra.copySync(expName, expCopy);
        res.send({ copyName: req.body.expname + '_copy' });
    });

/////DELETE EXPERIMENT!!!\\\\\

app.delete(
    "/api/expdel/:expfile",
    (req, res) => {

        const delfile = Path.join(__dirname, 'library', 'experiments', req.params.expfile);
        fs.unlinkSync(delfile);
        res.send({ delExp: req.params.expfile });
    });

/////FEATURE EDITOR!!!\\\\\

app.post(
    "/api/attributes",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        let featureName = req.body.featurename;
        let newFeature = { featurename: featureName };
        const xmlFile = Path.join(__dirname, 'library', 'attributes.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        const result = xmlParser(data);
        let id = Math.max.apply(Math, result.features.featureitem.map((o) => { return o.id[0]; }));
        newFeature.id = String(id + 1);
        result.features.featureitem.push(newFeature);
        const xml = builder.buildObject(result);
        fs.writeFileSync(xmlFile, xml);
        res.send(newFeature);
    });

app.post(
    "/api/concepts",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        let conceptName = req.body.conceptname;
        let valueList = req.body.value;
        let newConcept = { conceptname: conceptName, value: valueList };
        const xmlFile = Path.join(__dirname, 'library', 'concepts.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        const result = xmlParser(data);
        let id = Math.max.apply(Math, result.concepts.conceptitem.map((o) => { return o.id[0]; }));
        newConcept.id = String(id + 1);
        result.concepts.conceptitem.push(newConcept);
        const xml = builder.buildObject(result);
        fs.writeFileSync(xmlFile, xml);
        res.send(newConcept);
    });

app.delete(
    "/api/attributes/:id",
    (req, res) => {

        const id = req.params.id;
        const xmlFile = Path.join(__dirname, 'library', 'attributes.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        parser.parseString(data, (err, result) => {
            for (let i = 0; result.features.featureitem.length; i++) {

                if (result.features.featureitem[i].id == id) {

                    const attribute = result.features.featureitem.splice(i, 1)[0];
                    const xml = builder.buildObject(result);
                    fs.writeFileSync(xmlFile, xml);
                    res.send(attribute);
                    break;
                }
            }
        });
    });

app.put(
    "/api/attributes",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        let featureId = req.body.id;
        let featureName = req.body.featurename;
        const xmlFile = Path.join(__dirname, 'library', 'attributes.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        parser.parseString(data, (err, result) => {
            for (let i = 0; i < result.features.featureitem.length; i++) {

                if (result.features.featureitem[i].id == featureId) {

                    result.features.featureitem[i].featurename = featureName;
                    const xml = builder.buildObject(result);
                    fs.writeFileSync(xmlFile, xml);
                    res.send(result.features.featureitem[i]);
                    break;
                }
            }
        });
    });

app.post(
    "/api/values",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        let featureName = req.body.featurename;
        let newValue = { valuename: req.body.valuename };
        const xmlFile = Path.join(__dirname, 'library', 'attributes.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        const result = xmlParser(data);
        for (let i = 0; i < result.features.featureitem.length; ++i) {
            if (result.features.featureitem[i].featurename[0] === featureName) {
                if (result.features.featureitem[i].valuename === undefined) {
                    result.features.featureitem[i].valuename = [newValue.valuename];
                    break;
                }
                result.features.featureitem[i].valuename.push(newValue.valuename);
                break;
            }
        }
        const xml = builder.buildObject(result);
        fs.writeFileSync(xmlFile, xml);
        res.send(newValue);
    });

app.delete(
    "/api/values/:featureid/:valuename",
    (req, res) => {

        const featureId = req.params.featureid;
        const valueName = req.params.valuename;
        const xmlFile = Path.join(__dirname, 'library', 'attributes.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        const result = xmlParser(data);
        for (let i = 0; result.features.featureitem.length; i++) {
            if (result.features.featureitem[i].id[0] === featureId) {
                for (let j = 0; j < result.features.featureitem[i].valuename.length; ++j) {
                    if (result.features.featureitem[i].valuename[j] === valueName) {
                        const value = { valuename: result.features.featureitem[i].valuename.splice(j, 1)[0] };
                        const xml = builder.buildObject(result);
                        fs.writeFileSync(xmlFile, xml);
                        res.send(value);
                        break;
                    }
                }
                break;
            }
        }
    });

app.put(
    "/api/values",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        let featureId = req.body.id;
        let prevValue = req.body.prevaluename;
        let newValue = req.body.valuename;
        const xmlFile = Path.join(__dirname, 'library', 'attributes.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        const result = xmlParser(data);
        for (let i = 0; i < result.features.featureitem.length; i++) {
            if (result.features.featureitem[i].id[0] === featureId) {
                for (let j = 0; j < result.features.featureitem[i].valuename.length; ++j) {
                    if (result.features.featureitem[i].valuename[j] === prevValue) {
                        result.features.featureitem[i].valuename[j] = newValue;
                        const xml = builder.buildObject(result);
                        fs.writeFileSync(xmlFile, xml);
                        res.send({ valuename: result.features.featureitem[i].valuename[j] });
                        break;
                    }
                }
                break;
            }
        }
    });

mongoClient.connect((err, client) => {

    if (err) return console.log(err);

    dbClient = client;
    app.locals.db = client.db("experiments");

    app.listen(8081, () => {    
        console.log("Сервер ожидает подключения...");
    });
});

process.on("SIGINT", () => {

    dbClient.close();
    process.exit();
});