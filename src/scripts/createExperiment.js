// import FileSaver from 'file-saver';
// import dialog from '@skpm/dialog';

function main() {

    const create = document.getElementById("create-experiment-flex-block");

    create.addEventListener('click', () => {

        /* let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "hello_world.txt"); */

        //console.log(__dirname);

        /*dialog.showSaveDialog(
            
            {
                filters: [{ name: 'XMLs', extensions: ['xml']}], 
                title: 'Save experiment as', 
                //defaultPath: Path.join(app.getPath('desktop'), 'title1'+'.pdf')
            },

            (filename) => { 
        
                pdf.create(docx).toFile(filename,function(err, res){ 
                    console.log(res.filename); 
                });
            }
        );*/

        document.getElementById("start").style.display = 'none';
        document.getElementById("creation").style.display = 'block';
    });
}

export {
    main as
    default,
};