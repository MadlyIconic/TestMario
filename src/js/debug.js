export function setUpMouseControl(canvas, entity, camera){
    let lastEvent;
        ['mmousedown', 'mousemove'].forEach(eventName => {
            canvas.addEventListener(eventName, event => {
              if(event.buttons === 1){
                entity.vel.set(0,0);
                entity.pos.set(event.offsetX + camera.pos.x ,event.offsetY + camera.pos.y);
              }else if(event.buttons === 2 && lastEvent && lastEvent.buttons == 2 && lastEvent.type == 'mousemove'){
                // let context=canvas.getContext("2d"); 
                // let radius = 20;
                // context.beginPath();
                // context.arc(event.offsetX, event.offsetY, radius, 0, 2 * Math.PI, false);
                // context.fillStyle = 'green';
                // context.fill();
                // context.lineWidth = 5;
                // context.strokeStyle = '#003300';
                //context.stroke();
                //console.log(camera.pos.x);
                if(camera.pos.x >= 0){
                  camera.pos.x -= event.offsetX - lastEvent.offsetX;
                }else{
                  camera.pos.x = 0;
                }
              }
              lastEvent = event;
            })
          })

          canvas.addEventListener('contextmenu',  event => { 
              event.preventDefault()
          });

          canvas.addEventListener('mousemove',  event => { 
            //console.log('Location:', event.offsetX, event.offsetY);
        })
    }
