import React from "react";
import { useParams } from "react-router-dom";

const Matbuot = () => {
  const { matbuotId } = useParams();
  console.log(matbuotId);
  return (
    <div>
      <h1>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
        asperiores, quod dolorum necessitatibus eum, reprehenderit recusandae
        illo, vero temporibus similique quibusdam? Error non quisquam cumque
        perspiciatis? Natus id sunt similique quos incidunt dolor quae sequi
        quia voluptatem reiciendis officia necessitatibus nobis amet ipsa vel
        repellat obcaecati tempora praesentium velit, aut tempore recusandae
        voluptates accusamus dicta! Omnis ratione error veritatis nemo est
        magnam, reiciendis beatae eius soluta, quaerat minus nostrum placeat
        magni cupiditate aspernatur quae hic accusamus illo itaque! Maiores
        ducimus quaerat assumenda dolores rerum iure doloremque, magni pariatur
        ad natus eos voluptatum, numquam ratione dolorum modi. Eaque voluptate
        odio quasi ex architecto illo neque dicta. Quaerat eos dignissimos vel
        tenetur accusamus temporibus nemo velit praesentium ullam perspiciatis
        quod voluptas ex est numquam, doloremque quisquam non nulla vero odio.
        Autem, quis. Unde ratione non totam officia nulla, doloremque
        reprehenderit nihil ipsum. Quaerat, magni velit nam consectetur mollitia
        quia nesciunt veritatis dolores tenetur aliquam, temporibus optio
        officia voluptate! Possimus vel ipsam enim doloremque, sed dolore illo
        magnam dignissimos ad a repellat minus ut cupiditate nemo quisquam
        natus. Dolorem eaque placeat ut et blanditiis sequi est quaerat
        doloribus optio exercitationem. Cupiditate deserunt eaque eum vel
        sapiente, molestias quod nesciunt dolor ullam eligendi esse?
      </h1>
      <mark>{matbuotId} </mark>
    </div>
  );
};

export default Matbuot;
