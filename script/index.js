/**
 * Trabalho da disciplina de Computação Gráfica.
 * UFPEL (Universidade Federal de Pelotas) - 2019/2.
 * Aluno: Micael Martins Popping.
 */

function main() {

    const canvas = document.getElementById("canvas");
    const gl = canvas.getContext("webgl2");
 
    if (!gl) {
      return;
    }

    const scene = new Scene(gl);

    requestAnimationFrame(drawScene);
        // Draw.
    function drawScene(now) {

        scene.process(now);
        requestAnimationFrame(drawScene);
    }
}

function degToRad(d) {
    return d * Math.PI / 180;
}

main();