const Express = require("express");
const xmlParser = require("xml2js-parser").parseStringSync;
const bodyParser = require("body-parser");
const xml2js = require("xml2js");
const fs = require("fs");
const Path = require("path");
const fileUpload = require("express-fileupload");

const app = Express();
const builder = new xml2js.Builder();
const jsonParser = bodyParser.json();

app.use(fileUpload());
app.use(Express.static(__dirname + "/public"));

app.post(
    "/api/upload",
    (req, res) => {

        console.log(req.body);
        let svgFile = req.body;
        const svgFolder = Path.join(__dirname, 'public', 'figures', 'figure.svg');
        svgFile.mv(svgFolder, (err) => {
            if (err)
                return res.status(500).send(err);
            res.send({ letter: 'File uploaded!' });
        });
    });

/////CREATE EXPERIMENT!!!\\\\\

app.get(
    "/api/attributes",
    (req, res) => {

        const xmlFile = Path.join(__dirname, 'library', 'attributes.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        const featureList = xmlParser(data);
        res.send(featureList.features.featureitem);
    });

/////EDIT EXPERIMENT!!!\\\\\

/////FEATURE EDITOR!!!\\\\\

app.post(
    "/api/attributes",
    jsonParser,
    (req, res) => {

        if (!req.body) return res.sendStatus(400);

        let featureName = req.body.featurename;
        let newFeature = { id: [], featurename: [featureName] };
        const xmlFile = Path.join(__dirname, 'library', 'attributes.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        const result = xmlParser(data);
        let id = Math.max.apply(Math, result.features.featureitem.map((o) => { return o.id[0]; }));
        newFeature.id[0] = id + 1;
        result.features.featureitem.push(newFeature);
        const xml = builder.buildObject(result);
        fs.writeFileSync(xmlFile, xml);
        res.send(newFeature);
    });

app.delete(
    "/api/attributes/:id",
    (req, res) => {

        const id = req.params.id;
        const xmlFile = Path.join(__dirname, 'library', 'attributes.xml');
        const data = fs.readFileSync(xmlFile, "utf8");
        const result = xmlParser(data);
        for (let i = 0; result.features.featureitem.length; i++) {

            if (result.features.featureitem[i].id[0] == id) {

                const attribute = result.features.featureitem.splice(i, 1)[0];
                const xml = builder.buildObject(result);
                fs.writeFileSync(xmlFile, xml);
                res.send(attribute);
                break;
            }
        }
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
        const result = xmlParser(data);
        for (let i = 0; i < result.features.featureitem.length; i++) {

            if (result.features.featureitem[i].id[0] == featureId) {

                result.features.featureitem[i].featurename[0] = featureName;
                const xml = builder.buildObject(result);
                fs.writeFileSync(xmlFile, xml);
                res.send(result.features.featureitem[i]);
                break;
            }
        }
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

/////FIGURE EDITOR!!!\\\\\



app.listen(8081, () => {    
    console.log("Сервер ожидает подключения...");
});