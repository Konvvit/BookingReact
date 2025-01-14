import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface ServiceCardProps {
  service: Service;
  onAdd?: (service: Service) => void;
  onRemove?: (service: Service) => void;
  isCartItem?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onAdd,
  onRemove,
  isCartItem = false,
}) => {
  return (
    <Card
      sx={{
        marginBottom: 2,
        boxShadow: 3,
        position: "relative",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {service.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {service.description}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Price: {service.price}
        </Typography>

        {isCartItem ? (
          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "white",
              "&:hover": { backgroundColor: "grey.200" },
            }}
            onClick={() => onRemove?.(service)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        ) : (
          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "white",
              "&:hover": { backgroundColor: "grey.200" },
            }}
            onClick={() => onAdd?.(service)}
          >
            <AddIcon />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
